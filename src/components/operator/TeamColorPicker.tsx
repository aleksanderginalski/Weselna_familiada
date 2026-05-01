import { useEffect, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

interface Props {
  color: string;
  label: string;
  onChange: (color: string) => void;
}

export function TeamColorPicker({ color, label, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    function handleMouseDown(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative flex items-center gap-2">
      <span className="text-xs text-familiada-text-secondary">{label}</span>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        title={`Zmień kolor: ${color}`}
        className="w-6 h-6 rounded border-2 border-familiada-border hover:border-familiada-gold shrink-0 transition-colors"
        style={{ backgroundColor: color }}
      />
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 z-10 bg-familiada-bg-panel border border-familiada-border rounded-lg p-2 shadow-lg">
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
}
