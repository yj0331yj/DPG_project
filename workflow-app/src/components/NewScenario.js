import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Draggable from 'react-draggable';
import Popup from './Popup';

export const NewScenario = ({ isExpanded }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [circles, setCircles] = useState([]);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const contentRef = useRef(null);
  const circleRefs = useRef([]);
  const isDragging = useRef(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const isBackgroundDragging = useRef(false);

  // 0.5cm를 픽셀로 변환 (대략 18.9px, 96 DPI 기준)
  const DOT_SIZE = 18.9;

  useEffect(() => {
    const centerX = window.innerWidth / 2 - 48;
    const centerY = window.innerHeight / 2 - 48;
    setCircles([{ icon: null, key: 0, x: centerX, y: centerY, color: '#60A5FA' }]);
  }, []);

  const togglePopup = (index) => {
    if (!isDragging.current) {
      setShowPopup(index);
    }
  };

  const handleIconSelect = ({ icon, color }) => {
    setCircles(prevCircles => {
      const newCircles = [...prevCircles];
      newCircles[showPopup] = { ...newCircles[showPopup], icon, color };
      if (showPopup === newCircles.length - 1) {
        const lastCircle = newCircles[newCircles.length - 1];
        newCircles.push({ 
          icon: null, 
          key: newCircles.length, 
          x: lastCircle.x + 200, 
          y: lastCircle.y,
          color: '#60A5FA'
        });
      }
      return newCircles;
    });
    setShowPopup(false);
  };

  const handleWheel = useCallback((event) => {
    event.preventDefault();
    const newScale = scale + (event.deltaY > 0 ? -0.1 : 0.1);
    setScale(Math.max(0.5, Math.min(newScale, 3)));
  }, [scale]);

  const handleBackgroundMouseDown = (e) => {
    if (e.target === e.currentTarget) {
      isBackgroundDragging.current = true;
      dragStartPos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleBackgroundMouseMove = (e) => {
    if (isBackgroundDragging.current) {
      const dx = e.clientX - dragStartPos.current.x;
      const dy = e.clientY - dragStartPos.current.y;
      setOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      dragStartPos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleBackgroundMouseUp = () => {
    isBackgroundDragging.current = false;
  };

  const handleDragStart = (e, data) => {
    isDragging.current = false;
    dragStartPos.current = { x: data.x, y: data.y };
  };

  const handleDrag = (index, e, data) => {
    const dragDistance = Math.sqrt(
      Math.pow(data.x - dragStartPos.current.x, 2) +
      Math.pow(data.y - dragStartPos.current.y, 2)
    );
    if (dragDistance > 5) {
      isDragging.current = true;
    }
    setCircles(prevCircles => {
      const newCircles = [...prevCircles];
      newCircles[index] = { ...newCircles[index], x: data.x, y: data.y };
      return newCircles;
    });
  };

  const handleDragStop = () => {
    setTimeout(() => {
      isDragging.current = false;
    }, 0);
  };

  const getCurvedPath = (startX, startY, endX, endY) => {
    const midX = (startX + endX) / 2;
    const midY = startY - 50;
    return `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`;
  };

  return (
    <div 
      className="w-full h-full overflow-hidden relative"
      onWheel={handleWheel}
      onMouseDown={handleBackgroundMouseDown}
      onMouseMove={handleBackgroundMouseMove}
      onMouseUp={handleBackgroundMouseUp}
      onMouseLeave={handleBackgroundMouseUp}
    >
      <div 
        ref={contentRef}
        className="w-full h-full"
        style={{
          transform: `scale(${scale}) translate(${offset.x}px, ${offset.y}px)`,
          transformOrigin: 'center center',
          transition: 'transform 0.1s',
        }}
      >
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <defs>
            {circles.map((circle, index) => {
              if (index === circles.length - 1) return null;
              return (
                <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={circle.color} />
                  <stop offset="100%" stopColor={circles[index + 1].color} />
                </linearGradient>
              );
            })}
          </defs>
          {circles.map((circle, index) => {
            if (index === circles.length - 1) return null;
            const startX = circle.x + 48;
            const startY = circle.y + 48;
            const endX = circles[index + 1].x + 48;
            const endY = circles[index + 1].y + 48;
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
          <Draggable
            key={circle.key}
            onStart={handleDragStart}
            onDrag={(e, data) => handleDrag(index, e, data)}
            onStop={handleDragStop}
            position={{x: circle.x, y: circle.y}}
          >
            <div
              ref={el => circleRefs.current[index] = el}
              className="absolute w-24 h-24 rounded-full flex items-center justify-center text-white transition-colors cursor-move"
              style={{ backgroundColor: circle.color }}
              onClick={() => togglePopup(index)}
            >
              {circle.icon ? (
                React.cloneElement(circle.icon, { size: 40, color: 'white' })
              ) : (
                <Plus size={40} color="white" />
              )}
            </div>
          </Draggable>
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
