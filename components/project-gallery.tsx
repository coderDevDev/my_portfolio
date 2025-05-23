'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ProjectGalleryProps {
  images: string[];
  projectTitle: string;
}

export function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === 0 ? images.length - 1 : selectedImage - 1
      );
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedImage !== null) {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    }
  };

  // Add keyboard event listeners
  useState(() => {
    if (selectedImage !== null) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <>
      {/* Gallery Grid */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-[#dcdcaa] mb-4">
          Project Gallery
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <Card
              key={index}
              className="relative group cursor-pointer overflow-hidden border border-[#3e3e3e] hover:border-[#569cd6] transition-all duration-300"
              onClick={() => openModal(index)}>
              <div className="relative h-48 w-full">
                <Image
                  src={image}
                  alt={`${projectTitle} screenshot ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
            onClick={closeModal}>
            <X className="h-6 w-6" />
          </Button>

          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                onClick={prevImage}>
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                onClick={nextImage}>
                <ChevronRight className="h-8 w-8" />
              </Button>
            </>
          )}

          {/* Image container */}
          <div className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center p-4">
            <div className="relative w-full h-full">
              <Image
                src={images[selectedImage]}
                alt={`${projectTitle} screenshot ${selectedImage + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {selectedImage + 1} / {images.length}
          </div>

          {/* Click outside to close */}
          <div className="absolute inset-0 -z-10" onClick={closeModal} />
        </div>
      )}
    </>
  );
}
