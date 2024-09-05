'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Star, Play, X, SquareArrowLeft, SquareArrowRight, Keyboard, BadgeInfo, CircleUser, UserSearch } from 'lucide-react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import logoInceptiv from '../../public/assets/logo_inceptiv.svg';

// Constants
const CARD_WIDTH = 290;
const CARD_SPACING = 16;
const VISIBLE_CARDS_DEFAULT = 4;
const LOADING_DELAY = 300;

// Types
interface ProjectData {
  id: number;
  logo: string;
  title: string;
  description: string;
  backgroundImage: string;
  backgroundCardImage: string;
  videoThumbnail: string;
  videoSrc: string;
  rating: number;
  quality: number;
  schedule: number;
  cost: number;
  willingToRefer: number;
}

// Components
const SidebarItem: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
  <div className="flex items-center justify-center w-12 h-12 mb-4 bg-transparent text-white rounded hover:bg-red-800 active:bg-red-900">
    {icon}
  </div>
);

const ProjectCard: React.FC<{
  logo: string;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
  delay: number;
  backgroundCardImage: string;
}> = ({ logo, title, description, isSelected, onClick, delay, backgroundCardImage }) => (
  <div 
    className={`
      flex flex-col justify-between p-8 flex-shrink-0 cursor-pointer transition-all duration-500 ease-in-out
      ${isSelected ? 'h-[370px] border-2 border-white' : 'h-[333px] border border-[#262626]'}
      rounded-xl bg-cover bg-center
    `}
    style={{
      width: `${CARD_WIDTH}px`,
      backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 99.99%, #000 100%), url(${backgroundCardImage})`,
      opacity: 0,
      animation: `fadeIn 0.5s ${delay}s forwards`
    }}
    onClick={onClick}
  >
    <div className="w-full">
      <img src={logo} alt={title} className="w-14 h-14 object-contain" />
    </div>
    <div className="w-full">
      <h3 className="text-white text-sm font-bold mb-1">{title}</h3>
      <p className="text-gray-400 text-xs">{description}</p>
    </div>
  </div>
);

const VideoThumbnailSection: React.FC<{
  thumbnailSrc: string;
  rating: number;
  quality: number;
  schedule: number;
  cost: number;
  willingToRefer: number;
  onPlay: () => void;
}> = ({ thumbnailSrc, rating, quality, schedule, cost, willingToRefer, onPlay }) => (
  <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
    <div className="relative w-64 h-36">
      <img 
        src={thumbnailSrc} 
        alt="Video thumbnail" 
        className="w-full h-full object-cover rounded-lg"
      />
      <button 
        onClick={onPlay}
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg"
      >
        <Play size={48} className="text-white" />
      </button>
    </div>
    <div className="flex flex-col space-y-1">
      <RatingItem value={rating} showStars fullWidth />
      <RatingItem label="Quality" value={quality} />
      <RatingItem label="Schedule" value={schedule} />
      <RatingItem label="Cost" value={cost} />
      <RatingItem label="Willing to Refer" value={willingToRefer} />
    </div>
  </div>
);

const RatingItem: React.FC<{ 
  label?: string; 
  value: number; 
  showStars?: boolean;
  fullWidth?: boolean;
}> = ({ label, value, showStars, fullWidth }) => (
  <div className={`flex items-center justify-between ${fullWidth ? 'w-full' : 'w-48'}`}>
    {label && <span className="text-gray-400 text-sm">{label}</span>}
    <div className={`flex items-center ${fullWidth ? 'w-full justify-between' : ''}`}>
      <span className="font-bold mr-1">{value.toFixed(1)}</span>
      {showStars && (
        <div className="flex flex-grow justify-end">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className="text-yellow-400" fill={i < Math.floor(value) ? "yellow" : "none"} />
          ))}
        </div>
      )}
    </div>
  </div>
);

const VideoModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
}> = ({ isOpen, onClose, videoSrc }) => (
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

// Data
const projectData: ProjectData[] = [
  { 
    id: 1, 
    logo: "/assets/logo_unity.svg",
    title: "Create interactive and explorational flight operations experiences", 
    description: "Unity", 
    backgroundImage: "/assets/bg_1.png", 
    backgroundCardImage: "/assets/card1.png", 
    videoThumbnail: "/assets/card1.png", 
    videoSrc: "/path/to/video1.mp4", 
    rating: 5.0,
    quality: 4.8,
    schedule: 4.5,
    cost: 4.7,
    willingToRefer: 5.0
  },
  { 
    id: 2, 
    logo: "/assets/logo_unity.svg",
    title: "New net project here", 
    description: "Unity", 
    backgroundImage: "/assets/bg_1.png", 
    backgroundCardImage: "/assets/card1.png", 
    videoThumbnail: "/assets/card1.png", 
    videoSrc: "/path/to/video1.mp4", 
    rating: 4.2,
    quality: 3.8,
    schedule: 5.5,
    cost: 4.7,
    willingToRefer: 5.0
  },
  { 
    id: 3, 
    logo: "/assets/logo_unity.svg",
    title: "New net project here", 
    description: "Unity", 
    backgroundImage: "/assets/bg_1.png", 
    backgroundCardImage: "/assets/card1.png", 
    videoThumbnail: "/assets/card1.png", 
    videoSrc: "/path/to/video1.mp4", 
    rating: 5.0,
    quality: 3.8,
    schedule: 5.5,
    cost: 4.7,
    willingToRefer: 5.0
  },
  { 
    id: 4, 
    logo: "/assets/logo_unity.svg",
    title: "New net project here", 
    description: "Unity", 
    backgroundImage: "/assets/bg_1.png", 
    backgroundCardImage: "/assets/card1.png", 
    videoThumbnail: "/assets/card1.png", 
    videoSrc: "/path/to/video1.mp4", 
    rating: 5.0,
    quality: 3.8,
    schedule: 5.5,
    cost: 4.7,
    willingToRefer: 5.0
  },
  { 
    id: 5, 
    logo: "/assets/logo_unity.svg",
    title: "New net project here", 
    description: "Unity", 
    backgroundImage: "/assets/bg_1.png", 
    backgroundCardImage: "/assets/card1.png", 
    videoThumbnail: "/assets/card1.png", 
    videoSrc: "/path/to/video1.mp4", 
    rating: 5.0,
    quality: 3.8,
    schedule: 5.5,
    cost: 4.7,
    willingToRefer: 5.0
  },
  { 
    id: 6, 
    logo: "/assets/logo_unity.svg",
    title: "New net project here", 
    description: "Unity", 
    backgroundImage: "/assets/bg_1.png", 
    backgroundCardImage: "/assets/card1.png", 
    videoThumbnail: "/assets/card1.png", 
    videoSrc: "/path/to/video1.mp4", 
    rating: 5.0,
    quality: 3.8,
    schedule: 5.5,
    cost: 4.7,
    willingToRefer: 5.0
  },
  { 
    id: 7, 
    logo: "/assets/logo_unity.svg",
    title: "New net project here", 
    description: "Unity", 
    backgroundImage: "/assets/bg_1.png", 
    backgroundCardImage: "/assets/card1.png", 
    videoThumbnail: "/assets/card1.png", 
    videoSrc: "/path/to/video1.mp4", 
    rating: 5.0,
    quality: 3.8,
    schedule: 5.5,
    cost: 4.7,
    willingToRefer: 5.0
  },
  { 
    id: 8, 
    logo: "/assets/logo_unity.svg",
    title: "New net project here", 
    description: "Unity", 
    backgroundImage: "/assets/bg_1.png", 
    backgroundCardImage: "/assets/card1.png", 
    videoThumbnail: "/assets/card1.png", 
    videoSrc: "/path/to/video1.mp4", 
    rating: 5.0,
    quality: 3.8,
    schedule: 5.5,
    cost: 4.7,
    willingToRefer: 5.0
  },
  { 
    id: 9, 
    logo: "/assets/logo_unity.svg",
    title: "New net project here", 
    description: "Unity", 
    backgroundImage: "/assets/bg_1.png", 
    backgroundCardImage: "/assets/card1.png", 
    videoThumbnail: "/assets/card1.png", 
    videoSrc: "/path/to/video1.mp4", 
    rating: 5.0,
    quality: 3.8,
    schedule: 5.5,
    cost: 4.7,
    willingToRefer: 5.0
  },
];

// Main Component
const Dashboard: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<ProjectData>(projectData[0]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [visibleCards, setVisibleCards] = useState<number>(VISIBLE_CARDS_DEFAULT);
  const [scrollIndex, setScrollIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const scrollStartLeft = useRef<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), LOADING_DELAY);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      handleResize();
      handleScroll();
    }
  }, [isLoading]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    carouselRef.current?.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      carouselRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [selectedCard.id]);

  const handleResize = () => {
    if (carouselRef.current) {
      const visibleCount = Math.floor(carouselRef.current.offsetWidth / CARD_WIDTH);
      setVisibleCards(Math.max(visibleCount, 1));
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const newIndex = Math.round(carouselRef.current.scrollLeft / CARD_WIDTH);
      setScrollIndex(newIndex);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        if (selectedCard.id > 1) {
          const newSelectedCard = projectData[selectedCard.id - 2];
          setSelectedCard(newSelectedCard);
          scrollToCard(newSelectedCard.id);
        }
        break;
      case 'ArrowRight':
        if (selectedCard.id < projectData.length) {
          const newSelectedCard = projectData[selectedCard.id];
          setSelectedCard(newSelectedCard);
          scrollToCard(newSelectedCard.id);
        }
        break;
    }
  };

  const scrollToCard = (cardId: number) => {
    if (carouselRef.current) {
      const newScrollPosition = (cardId - 1) * (CARD_WIDTH + CARD_SPACING);
      carouselRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
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

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (carouselRef.current?.offsetLeft || 0);
    scrollStartLeft.current = carouselRef.current?.scrollLeft || 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollStartLeft.current - walk;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const totalSteps = Math.ceil(projectData.length / visibleCards);
  const currentStep = Math.floor((scrollIndex + visibleCards - 1) / visibleCards);

  return (
    <div className="relative flex bg-gray-900 text-white h-screen" tabIndex={0}>
      <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url(${selectedCard.backgroundImage})`, animation: 'fadeIn 1s forwards' }}></div>
      <div className="absolute inset-0"></div>
      <aside className="w-16 bg-red-500 flex flex-col items-center py-4 z-10">
        <SidebarItem icon={<img src={logoInceptiv.src} alt="Logo" />} />
        <SidebarItem icon={<BadgeInfo />} />
        <SidebarItem icon={<CircleUser />} />
        <SidebarItem icon={<UserSearch />} />
      </aside>
      <main className="flex-1 p-4 md:p-20 z-10 flex flex-col justify-between overflow-hidden">
        {isLoading ? (
          <LoadingSkeletons />
        ) : (
          <>
            <ProjectDetails selectedCard={selectedCard} setIsVideoModalOpen={setIsVideoModalOpen} />
            <ProjectCarousel 
              projectData={projectData}
              selectedCard={selectedCard}
              setSelectedCard={setSelectedCard}
              carouselRef={carouselRef}
              handleMouseDown={handleMouseDown}
              handleMouseLeave={handleMouseLeave}
              handleMouseUp={handleMouseUp}
              handleMouseMove={handleMouseMove}
              scrollIndex={scrollIndex}
              visibleCards={visibleCards}
              scrollLeft={scrollLeft}
              scrollRight={scrollRight}
              totalSteps={totalSteps}
              currentStep={currentStep}
            />
          </>
        )}
      </main>
      <NavigationHint />
      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
        videoSrc={selectedCard.videoSrc}
      />
    </div>
  );
};

const LoadingSkeletons: React.FC = () => (
  <>
    <div className="flex h-full w-full">
    <div className="flex flex-col md:flex-row items-center w-[80%] justify-between mx-auto">
    <div className="max-w-[600px]">
        <header className="mb-8">
          <SkeletonTheme baseColor="#ccc" highlightColor="#444">
            <Skeleton circle={true} height={56} width={56} className="mb-4" />
            <Skeleton height={32} width={400} className="mb-2" />
            <Skeleton height={16} width={300} className="mb-4" />
            <Skeleton height={32} width={100} />
          </SkeletonTheme>
        </header>
      </div>
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
        <div className="relative w-64 h-36">
          <Skeleton height={144} width={256} className="rounded-lg" />
        </div>
        <div className="flex flex-col space-y-1">
          <RatingItemSkeleton fullWidth />
          {[...Array(4)].map((_, index) => (
            <RatingItemSkeleton key={index} />
          ))}
        </div>
      </div>
      </div>
    </div>
    <div className="relative">
      <div className="flex space-x-4 justify-between overflow-x-auto overflow-y-visible scrollbar-hide transition-all duration-500">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex-shrink-0 rounded-lg p-4" style={{ height: '333px', width: '290px' }}>
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
);

const RatingItemSkeleton: React.FC<{ fullWidth?: boolean }> = ({ fullWidth }) => (
  <div className={`flex items-center justify-between ${fullWidth ? 'w-full' : 'w-48'}`}>
    {!fullWidth && <Skeleton height={16} width={80} />}
    <div className={`flex items-center ${fullWidth ? 'w-full justify-between' : ''}`}>
      <Skeleton height={16} width={30} />
      {fullWidth && (
        <div className="flex flex-grow justify-end">
          <Skeleton height={16} width={100} />
        </div>
      )}
    </div>
  </div>
);

const ProjectDetails: React.FC<{
  selectedCard: ProjectData;
  setIsVideoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ selectedCard, setIsVideoModalOpen }) => (
  <div className="flex h-full w-full">
    <div className="flex flex-col md:flex-row items-center w-[80%] justify-between mx-auto">
    <div className="max-w-[600px]">
      <header className="mb-8">
        <img src={selectedCard.logo} alt="Project logo" className="mb-4 w-20 h-20 object-contain" />
        <h1 className="text-3xl font-bold mb-2">{selectedCard.title}</h1>
        <p className="text-gray-400 mb-4">An aerospace manufacturing company hired Inceptiv Inc. to design a digital flight demand and operations experience.</p>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Case Study</button>
      </header>
    </div>
    <VideoThumbnailSection 
      thumbnailSrc={selectedCard.videoThumbnail}
      rating={selectedCard.rating}
      quality={selectedCard.quality}
      schedule={selectedCard.schedule}
      cost={selectedCard.cost}
      willingToRefer={selectedCard.willingToRefer}
      onPlay={() => setIsVideoModalOpen(true)}
    />
    </div>
  </div>
);

const ProjectCarousel: React.FC<{
  projectData: ProjectData[];
  selectedCard: ProjectData;
  setSelectedCard: React.Dispatch<React.SetStateAction<ProjectData>>;
  carouselRef: React.RefObject<HTMLDivElement>;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseLeave: () => void;
  handleMouseUp: () => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  scrollIndex: number;
  visibleCards: number;
  scrollLeft: () => void;
  scrollRight: () => void;
  totalSteps: number;
  currentStep: number;
}> = ({ 
  projectData, 
  selectedCard, 
  setSelectedCard, 
  carouselRef, 
  handleMouseDown, 
  handleMouseLeave, 
  handleMouseUp, 
  handleMouseMove, 
  scrollIndex, 
  visibleCards, 
  scrollLeft, 
  scrollRight, 
  totalSteps, 
  currentStep 
}) => (
  <div className="relative">
    <div className="flex md:justify-end justify-center mb-4">
      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          className={`w-3 h-1 mx-0.5 rounded-full ${index === currentStep ? 'bg-white' : 'bg-gray-500'}`}
        />
      ))}
    </div>
    <div 
      ref={carouselRef} 
      className="flex space-x-4 items-stretch overflow-x-auto overflow-y-visible scrollbar-hide transition-all duration-500 h-[370px]"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {projectData.map((project, index) => (
        <ProjectCard
          key={project.id}
          {...project}
          isSelected={selectedCard.id === project.id}
          onClick={() => setSelectedCard(project)}
          delay={index * 0.1}
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
);

const NavigationHint: React.FC = () => (
  <div className="absolute bottom-8 hidden md:flex right-0 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full items-center space-x-2">
    <SquareArrowLeft size={16} />
    <Keyboard size={20} />
    <SquareArrowRight size={16} />
  </div>
);

export default Dashboard;