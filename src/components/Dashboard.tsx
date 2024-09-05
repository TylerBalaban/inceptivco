'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Star, Play, X } from 'lucide-react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SidebarItemProps {
  icon: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon }) => (
  <div className="flex items-center justify-center w-12 h-12 mb-4 bg-transparent text-white rounded hover:bg-red-800 active:bg-red-900">
    {icon}
  </div>
);

interface ProjectCardProps {
  logo: string;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
  delay: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ logo, title, description, isSelected, onClick, delay }) => (
  <div 
    className={`flex-shrink-0 bg-gray-800 rounded-lg p-4 cursor-pointer transition-opacity duration-500 ease-in-out
                ${isSelected ? 'border-2 border-red-500 py-10' : 'hover:scale-y-102'}`}
    style={{ height: isSelected ? '320px' : '280px', width: '250px', opacity: 0, animation: `fadeIn 0.5s ${delay}s forwards` }}
    onClick={onClick}
  >
    <img src={logo} alt={title} className="w-8 h-8 mb-2" />
    <h3 className="text-white text-sm font-bold mb-1">{title}</h3>
    <p className="text-gray-400 text-xs">{description}</p>
  </div>
);

interface RatingProps {
  score: number;
}

const Rating: React.FC<RatingProps> = ({ score }) => (
  <div className="flex items-center">
    <span className="text-yellow-400 mr-1">{score.toFixed(1)}</span>
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={12} className="text-yellow-400" fill={i < Math.floor(score) ? "yellow" : "none"} />
    ))}
  </div>
);

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoSrc }) => (
  isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative w-full max-w-4xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-white">
          <X size={24} />
        </button>
        <video src={videoSrc} controls className="w-full" autoPlay />
      </div>
    </div>
  ) : null
);

interface ProjectData {
  id: number;
  logo: string;
  title: string;
  description: string;
  backgroundImage: string;
  videoThumbnail: string;
  videoSrc: string;
  rating: number;
}

const projectData: ProjectData[] = [
  { id: 1, logo: "/api/placeholder/32/32", title: "Create interactive and explorational flight operations experiences", description: "Unity", backgroundImage: "/api/placeholder/1920/1080", videoThumbnail: "/api/placeholder/640/360", videoSrc: "/path/to/video1.mp4", rating: 5.0 },
  { id: 2, logo: "/api/placeholder/32/32", title: "By leveraging the power of AI, we help make buildings safer, smarter and more secure.", description: "DUCLO", backgroundImage: "/api/placeholder/1920/1080", videoThumbnail: "/api/placeholder/640/360", videoSrc: "/path/to/video2.mp4", rating: 4.8 },
  { id: 3, logo: "/api/placeholder/32/32", title: "Create interactive and explorational flight operations experiences", description: "Unity", backgroundImage: "/api/placeholder/1920/1080", videoThumbnail: "/api/placeholder/640/360", videoSrc: "/path/to/video3.mp4", rating: 4.9 },
  { id: 4, logo: "/api/placeholder/32/32", title: "Create interactive and explorational flight operations experiences", description: "Unity", backgroundImage: "/api/placeholder/1920/1080", videoThumbnail: "/api/placeholder/640/360", videoSrc: "/path/to/video4.mp4", rating: 4.7 },
  { id: 5, logo: "/api/placeholder/32/32", title: "Create interactive and explorational flight operations experiences", description: "Unity", backgroundImage: "/api/placeholder/1920/1080", videoThumbnail: "/api/placeholder/640/360", videoSrc: "/path/to/video5.mp4", rating: 5.0 },
  { id: 6, logo: "/api/placeholder/32/32", title: "Create interactive and explorational flight operations experiences", description: "Unity", backgroundImage: "/api/placeholder/1920/1080", videoThumbnail: "/api/placeholder/640/360", videoSrc: "/path/to/video1.mp4", rating: 5.0 },
  { id: 7, logo: "/api/placeholder/32/32", title: "By leveraging the power of AI, we help make buildings safer, smarter and more secure.", description: "DUCLO", backgroundImage: "/api/placeholder/1920/1080", videoThumbnail: "/api/placeholder/640/360", videoSrc: "/path/to/video2.mp4", rating: 4.8 },
  { id: 8, logo: "/api/placeholder/32/32", title: "Create interactive and explorational flight operations experiences", description: "Unity", backgroundImage: "/api/placeholder/1920/1080", videoThumbnail: "/api/placeholder/640/360", videoSrc: "/path/to/video3.mp4", rating: 4.9 },
  { id: 9, logo: "/api/placeholder/32/32", title: "Create interactive and explorational flight operations experiences", description: "Unity", backgroundImage: "/api/placeholder/1920/1080", videoThumbnail: "/api/placeholder/640/360", videoSrc: "/path/to/video4.mp4", rating: 4.7 },
  { id: 10, logo: "/api/placeholder/32/32", title: "Create interactive and explorational flight operations experiences", description: "Unity", backgroundImage: "/api/placeholder/1920/1080", videoThumbnail: "/api/placeholder/640/360", videoSrc: "/path/to/video5.mp4", rating: 5.0 },
  { id: 11, logo: "/api/placeholder/32/32", title: "Create interactive and explorational flight operations experiences", description: "Unity", backgroundImage: "/api/placeholder/1920/1080", videoThumbnail: "/api/placeholder/640/360", videoSrc: "/path/to/video1.mp4", rating: 5.0 },
  { id: 12, logo: "/api/placeholder/32/32", title: "By leveraging the power of AI, we help make buildings safer, smarter and more secure.", description: "DUCLO", backgroundImage: "/api/placeholder/1920/1080", videoThumbnail: "/api/placeholder/640/360", videoSrc: "/path/to/video2.mp4", rating: 4.8 },
  { id: 13, logo: "/api/placeholder/32/32", title: "Create interactive and explorational flight operations experiences", description: "Unity", backgroundImage: "/api/placeholder/1920/1080", videoThumbnail: "/api/placeholder/640/360", videoSrc: "/path/to/video3.mp4", rating: 4.9 },
  { id: 14, logo: "/api/placeholder/32/32", title: "Create interactive and explorational flight operations experiences", description: "Unity", backgroundImage: "/api/placeholder/1920/1080", videoThumbnail: "/api/placeholder/640/360", videoSrc: "/path/to/video4.mp4", rating: 4.7 },
  { id: 15, logo: "/api/placeholder/32/32", title: "Create interactive and explorational flight operations experiences", description: "Unity", backgroundImage: "/api/placeholder/1920/1080", videoThumbnail: "/api/placeholder/640/360", videoSrc: "/path/to/video5.mp4", rating: 5.0 },
];

const Dashboard: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<ProjectData>(projectData[0]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [visibleCards, setVisibleCards] = useState<number>(0);
  const [scrollIndex, setScrollIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const scrollStartLeft = useRef<number>(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (carouselRef.current?.offsetLeft || 0);
    scrollStartLeft.current = carouselRef.current?.scrollLeft || 0;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 2; // scroll-fast
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollStartLeft.current - walk;
    }
  };

  const handleResize = () => {
    if (carouselRef.current) {
      const cardWidth = 250; // width of each card
      const visibleCount = Math.floor(carouselRef.current.offsetWidth / cardWidth);
      setVisibleCards(visibleCount > 0 ? visibleCount : 1); // Ensure at least one card is visible
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const newIndex = Math.min(scrollIndex + visibleCards, projectData.length - visibleCards);
      setScrollIndex(newIndex);
      carouselRef.current.scrollTo({
        left: carouselRef.current.scrollLeft + carouselRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      const newIndex = Math.max(scrollIndex - visibleCards, 0);
      setScrollIndex(newIndex);
      carouselRef.current.scrollTo({
        left: carouselRef.current.scrollLeft - carouselRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const cardWidth = 250; // width of each card
      const newIndex = Math.round(carouselRef.current.scrollLeft / cardWidth);
      setScrollIndex(newIndex);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    if (carouselRef.current) {
      carouselRef.current.addEventListener('scroll', handleScroll);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
      if (carouselRef.current) {
        carouselRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      handleResize();
      handleScroll();
    }
  }, [isLoading]);

  const totalSteps = Math.ceil(projectData.length / (visibleCards || 1)); // Ensure visibleCards is not zero
  const currentStep = Math.floor((scrollIndex + visibleCards - 1) / visibleCards);

  return (
    <div className="relative flex bg-gray-900 text-white h-screen">
      <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url(${selectedCard.backgroundImage})`, animation: 'fadeIn 1s forwards' }}></div>
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <aside className="w-16 bg-red-700 flex flex-col items-center py-4 z-10">
        <SidebarItem icon={<img src="/api/placeholder/24/24" alt="Logo" />} />
        <SidebarItem icon={<img src="/api/placeholder/24/24" alt="Work" />} />
        <SidebarItem icon={<img src="/api/placeholder/24/24" alt="People" />} />
        <SidebarItem icon={<img src="/api/placeholder/24/24" alt="Layers" />} />
        <SidebarItem icon={<img src="/api/placeholder/24/24" alt="Mail" />} />
      </aside>
      
      <main className="flex-1 p-8 z-10 flex flex-col justify-between overflow-hidden">
        {isLoading ? (
          <>
            <div className="flex flex-col md:flex-row justify-between">
              <div className="max-w-[600px] min-h-[400px]">
                <header className="mb-8">
                  <SkeletonTheme baseColor="#ccc" highlightColor="#444">
                    <Skeleton circle={true} height={32} width={32} className="mb-4" />
                    <Skeleton height={32} width={200} className="mb-2" />
                    <Skeleton height={16} width={300} className="mb-4" />
                    <Skeleton height={32} width={100} />
                  </SkeletonTheme>
                </header>
              </div>
              
              <div className="flex flex-col md:flex-row items-center mb-8">
                <SkeletonTheme baseColor="#ccc" highlightColor="#444">
                  <Skeleton height={150} width={200} className="rounded-lg" />
                  <div className="md:w-1/2 flex items-center justify-center md:justify-start">
                    <div className="bg-white text-black p-2 rounded flex items-center">
                      <Skeleton height={12} width={50} className="mr-2" />
                      <Skeleton height={12} width={50} />
                    </div>
                  </div>
                </SkeletonTheme>
              </div>
            </div>
            
            <div className="relative">
              <div className="flex space-x-4 overflow-x-auto overflow-y-visible scrollbar-hide transition-all duration-500">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="flex-shrink-0 bg-gray-800 rounded-lg p-4" style={{ height: '280px', width: '250px' }}>
                    <SkeletonTheme baseColor="#ccc" highlightColor="#444">
                      <Skeleton circle={true} height={32} width={32} className="mb-2" />
                      <Skeleton height={16} width={150} className="mb-1" />
                      <Skeleton height={12} width={200} />
                    </SkeletonTheme>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between">
              <div className="max-w-[600px] min-h-[400px]">
                <header className="mb-8">
                  <img src={selectedCard.logo} alt="Project logo" className="mb-4" style={{ height: '32px', width: '32px' }} />
                  <h1 className="text-3xl font-bold mb-2" style={{ height: '32px', width: '200px' }}>{selectedCard.title}</h1>
                  <p className="text-gray-400 mb-4" style={{ height: '16px', width: '300px' }}>An aerospace manufacturing company hired Inceptiv Inc. to design a digital flight demand and operations experience.</p>
                  <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" style={{ height: '32px', width: '100px' }}>Case Study</button>
                </header>
              </div>
              
              <div className="flex flex-col md:flex-row items-center mb-8">
                <div className="relative">
                  <img src={selectedCard.videoThumbnail} alt="Video thumbnail" className="w-full rounded-lg" style={{ width: '200px', height: '150px' }} />
                  <button 
                    onClick={() => setIsVideoModalOpen(true)} 
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg"
                    style={{ width: '200px', height: '150px' }}
                  >
                    <Play size={48} className="text-white" />
                  </button>
                </div>
                <div className="md:w-1/2 flex items-center justify-center md:justify-start">
                  <div className="bg-white text-black p-2 rounded flex items-center">
                    <Rating score={selectedCard.rating} />
                    <div className="ml-2">
                      <div className="font-bold" style={{ height: '12px', width: '50px' }}>{selectedCard.rating.toFixed(1)}</div>
                      <div className="text-xs" style={{ height: '12px', width: '50px' }}>Quality</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
            <div className="flex justify-end mb-4">
                {[...Array(totalSteps)].map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-1 mx-0.5 rounded-full ${index === currentStep ? 'bg-white' : 'bg-gray-500'}`}
                  />
                ))}
              </div>
              <div 
                ref={carouselRef} 
                className="flex space-x-4 overflow-x-auto overflow-y-visible scrollbar-hide transition-all duration-500"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
              >
                {projectData.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    {...project}
                    isSelected={selectedCard.id === project.id}
                    onClick={() => setSelectedCard(project)}
                    delay={index * 0.1} // Add delay for each card
                  />
                ))}
              </div>
              {scrollIndex > 0 && (
                <button 
                  onClick={scrollLeft} 
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                  &lt;
                </button>
              )}
              {scrollIndex + visibleCards < projectData.length && (
                <button 
                  onClick={scrollRight} 
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                  &gt;
                </button>
              )}
            </div>
          </>
        )}
      </main>

    <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
        videoSrc={selectedCard.videoSrc}
      />
    </div>
  );
};

export default Dashboard;