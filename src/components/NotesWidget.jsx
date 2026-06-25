import React from 'react';
import { useStore } from '../store/useStore';

const NotesWidget = () => {
  const { notes, setNotes } = useStore();

  return (
    <div 
      className="widget-panel" 
      style={{ 
        backgroundColor: '#F6DE8D', // The specific yellow from the design
        color: '#000000',           // Black text for contrast
        padding: '1.5rem', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        border: 'none'              // Removes the dark border used on other widgets
      }}
    >
      <h2 style={{ 
        fontSize: '1.5rem', 
        fontWeight: 'bold', 
        marginBottom: '1rem',
        letterSpacing: '0.5px'
      }}>
        All notes
      </h2>
      
      <textarea 
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          border: 'none',
          resize: 'none',       // Prevents the user from breaking the layout by dragging the corner
          outline: 'none',      // Removes the blue focus ring
          fontSize: '1.125rem',
          color: '#000000',
          fontFamily: 'inherit', // Matches the rest of your app's font
          lineHeight: '1.6'
        }}
        placeholder="Type your notes here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
    </div>
  );
};

export default NotesWidget;