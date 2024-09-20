import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Draggable from 'react-draggable';
import Popup from './Popup';
import { getCurvedPath } from './utils';
import { MAIN_CIRCLE_SIZE, DOT_SIZE, PLUS_BUTTON_SIZE, CLICK_THRESHOLD } from './constants';
import Circle from './Circle';

export const NewScenario = ({ isExpanded }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [circles, setCircles] = useState([]);
  const [scale, setScale] = useState(1);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const contentRef = useRef(null);
  const circleRefs = useRef([]);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  useEffect(() => {
    const centerX = window.innerWidth / 2 - MAIN_CIRCLE_SIZE / 2;
    const centerY = window.innerHeight / 2 - MAIN_CIRCLE_SIZE / 2;
    setCircles([{
      icon: <Plus size={40} />,
      key: 0,
      x: centerX,
      y: centerY,
      color: '#60A5FA',
      parentIndex: null,
      showPlusButton: false,
      isFirstCircle: true
    }]);
    setSvgSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    const updateSvgSize = () => {
      const minX = Math.min(...circles.map(c => c.x)) - 100;
      const maxX = Math.max(...circles.map(c => c.x)) + 100;
      const minY = Math.min(...circles.map(c => c.y)) - 100;
      const maxY = Math.max(...circles.map(c => c.y)) + 100;
      setSvgSize({
        width: Math.max(maxX - minX, window.innerWidth),
        height: Math.max(maxY - minY, window.innerHeight)
      });
    };
    updateSvgSize();
  }, [circles]);

  const togglePopup = (index) => {
    setShowPopup(current => current === index ? false : index);
  };

  const handleIconSelect = ({ icon, name, color }) => {
    setCircles(prevCircles => {
      const newCircles = [...prevCircles];
      const targetIndex = showPopup;
      if (targetIndex !== false && targetIndex < newCircles.length) {
        newCircles[targetIndex] = {
          ...newCircles[targetIndex],
          icon,
          name,
          color,
          showPlusButton: true,
          isFirstCircle: false
        };
      }
      return newCircles;
    });
    setShowPopup(false);
  };

  const handleWheel = useCallback((event) => {
    if (showPopup !== false) return;
    event.preventDefault();
    const newScale = scale + (event.deltaY > 0 ? -0.1 : 0.1);
    setScale(Math.max(0.5, Math.min(newScale, 3)));
  }, [scale, showPopup]);

  const handleCircleDragStart = (e, data) => {
    dragStartPos.current = { x: data.x, y: data.y };
  };

  const handleCircleDrag = (index, e, data) => {
    setCircles(prevCircles => {
      const newCircles = [...prevCircles];
      if (index < newCircles.length) {
        newCircles[index] = { ...newCircles[index], x: data.x, y: data.y };
      }
      return newCircles;
    });
  };

  const handleCircleDragStop = (index, e, data) => {
    const dragDistance = Math.sqrt(
      Math.pow(data.x - dragStartPos.current.x, 2) +
      Math.pow(data.y - dragStartPos.current.y, 2)
    );
    if (dragDistance < CLICK_THRESHOLD) {
      togglePopup(index);
    }
  };

  const addNewCircle = (parentIndex) => {
    setCircles(prevCircles => {
      const newCircles = [...prevCircles];
      const parentCircle = newCircles[parentIndex];
      if (!parentCircle) return newCircles;

      const newCircle = {
        icon: <Plus size={40} />,
        key: newCircles.length,
        x: parentCircle.x + MAIN_CIRCLE_SIZE,
        y: parentCircle.y,
        color: '#60A5FA',
        label: '새 작업',
        subLabel: '',
        parentIndex: parentIndex,
        showPlusButton: false,
        isFirstCircle: false
      };
      newCircles.push(newCircle);

      if (parentCircle.isFirstCircle) {
        newCircles[parentIndex] = { ...parentCircle, showPlusButton: false };
      }

      return newCircles;
    });
    setShowPopup(circles.length);
  };

  const handleBackgroundDragStart = (e) => {
    if (!e.target.closest('.circle-container')) {
      isDragging.current = true;
      dragStartPos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleBackgroundDrag = (e) => {
    if (isDragging.current) {
      const dx = e.clientX - dragStartPos.current.x;
      const dy = e.clientY - dragStartPos.current.y;
      setOffset(prevOffset => ({
        x: prevOffset.x + dx / scale,
        y: prevOffset.y + dy / scale
      }));
      dragStartPos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleBackgroundDragStop = () => {
    isDragging.current = false;
  };

  return (
    <div
      className="w-full h-full overflow-hidden relative bg-blue-50"
      onWheel={handleWheel}
      onMouseDown={handleBackgroundDragStart}
      onMouseMove={handleBackgroundDrag}
      onMouseUp={handleBackgroundDragStop}
      onMouseLeave={handleBackgroundDragStop}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dotGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="#000000" fillOpacity="0.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotGrid)" />
      </svg>
      
      <div
        ref={contentRef}
        className="w-full h-full absolute top-0 left-0"
        style={{
          transform: `scale(${scale}) translate(${offset.x}px, ${offset.y}px)`,
          transformOrigin: 'center center',
          transition: 'transform 0.1s',
        }}
      >
        <svg
          className="absolute top-0 left-0"
          width={svgSize.width}
          height={svgSize.height}
          style={{ overflow: 'visible' }}
        >
          <defs>
            {circles.map((circle, index) => {
              if (circle.parentIndex === null || circle.parentIndex >= circles.length) return null;
              const parentCircle = circles[circle.parentIndex];
              if (!parentCircle) return null;
              return (
                <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={parentCircle.color} />
                  <stop offset="100%" stopColor={circle.color} />
                </linearGradient>
              );
            })}
          </defs>
          {circles.map((circle, index) => {
            if (circle.parentIndex === null || circle.parentIndex >= circles.length) return null;
            const parentCircle = circles[circle.parentIndex];
            if (!parentCircle) return null;
            const startX = parentCircle.x + MAIN_CIRCLE_SIZE / 2;
            const startY = parentCircle.y + MAIN_CIRCLE_SIZE / 2;
            const endX = circle.x + MAIN_CIRCLE_SIZE / 2;
            const endY = circle.y + MAIN_CIRCLE_SIZE / 2;
            const path = getCurvedPath(startX, startY, endX, endY);
            return (
              <path
                key={`path-${index}`}
                d={path}
                fill="none"
                stroke={`url(#gradient-${index})`}
                strokeWidth={DOT_SIZE / scale}
                strokeLinecap="round"
                strokeDasharray={`0 ${DOT_SIZE * 1.5 / scale}`}
              />
            );
          })}
        </svg>
        {circles.map((circle, index) => (
          <Circle
            key={circle.key}
            circle={circle}
            index={index}
            handleDragStart={handleCircleDragStart}
            handleDrag={handleCircleDrag}
            handleDragStop={handleCircleDragStop}
            addNewCircle={addNewCircle}
            ref={el => circleRefs.current[index] = el}
          />
        ))}
      </div>

      {showPopup !== false && (
        <Popup
          onClose={() => setShowPopup(false)}
          isExpanded={isExpanded}
          onSelectIcon={handleIconSelect}
        />
      )}
    </div>
  );
};

export default NewScenario;
