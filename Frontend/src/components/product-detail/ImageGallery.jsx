import React, { useState } from 'react';

export const ImageGallery = ({ images = [] }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div>
      <div className="rounded-4 overflow-hidden bg-body-tertiary mb-3 text-center position-relative shadow-sm">
        <img
          src={images[selectedIdx]}
          alt="Product gallery"
          className="w-100 object-fit-cover hover-scale"
          style={{ maxHeight: '420px', minHeight: '300px' }}
        />
      </div>

      {images.length > 1 && (
        <div className="d-flex gap-2 overflow-auto py-1">
          {images.map((img, i) => (
            <button
              key={i}
              className={`btn p-0 border-2 rounded-3 overflow-hidden ${selectedIdx === i ? 'border-primary' : 'border-transparent opacity-75'}`}
              onClick={() => setSelectedIdx(i)}
            >
              <img src={img} alt={`Thumb ${i}`} style={{ width: '70px', height: '70px', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
