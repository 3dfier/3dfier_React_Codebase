import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './assets/3Dfier_Logo.PNG';
import { 
  Printer, 
  Box, 
  MessageSquare, 
  Upload, 
  Mail, 
  MapPin, 
  Instagram, 
  Linkedin,
  Youtube,
  MessageCircle,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Maximize2
} from 'lucide-react';

// Dynamic import for gallery images
const galleryImages = import.meta.glob('./assets/gallery/webp/**/*.{webp,WEBP}', { eager: true, as: 'url' });

const getCategoryImages = (category) => {
  return Object.entries(galleryImages)
    .filter(([path]) => path.includes(category))
    .map(([__, url]) => url);
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <img src={Logo} alt="3dfier Logo" className="h-10 w-auto" />
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#services" className="text-slate-300 hover:text-brand-orange transition-colors">Services</a>
              <a href="#portfolio" className="text-slate-300 hover:text-brand-orange transition-colors">Portfolio</a>
              <a href="#contact" className="text-slate-300 hover:text-brand-orange transition-colors">Contact</a>
              <a href="#quote" className="px-4 py-2 bg-brand-orange hover:bg-orange-600 rounded-lg text-white font-medium transition-all shadow-lg shadow-brand-orange/20">Get a Quote</a>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-4 overflow-hidden"
          >
            <a href="#services" onClick={() => setIsOpen(false)} className="block text-slate-300">Services</a>
            <a href="#portfolio" onClick={() => setIsOpen(false)} className="block text-slate-300">Portfolio</a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="block text-slate-300">Contact</a>
            <a href="#quote" onClick={() => setIsOpen(false)} className="block text-center px-4 py-2 bg-brand-orange rounded-lg text-white font-medium">Get a Quote</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemLeft = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0 }
  };

  const itemRight = {
    hidden: { opacity: 0, x: 30 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <section id="services" className="min-h-screen flex items-center pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Branding */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          <motion.div variants={itemLeft}>
            <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tighter">
              <span className="block text-slate-100 uppercase">Precision</span>
              <span className="block bg-brand-gradient bg-clip-text text-transparent uppercase">Innovation</span>
            </h1>
          </motion.div>
          <motion.p variants={itemLeft} className="text-xl md:text-2xl text-slate-400 max-w-lg leading-relaxed">
            Transforming digital designs into tangible reality with high-quality FDM 3D printing services.
          </motion.p>
        </motion.div>

        {/* Right Side: Services Cards */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6"
        >
          <motion.div variants={itemRight}>
            <ServiceCard 
              icon={Printer}
              title="3D Printing"
              description="High-precision 3d printing with industrial materials like PLA, PETG and ABS/ASA."
            />
          </motion.div>
          <motion.div variants={itemRight}>
            <ServiceCard 
              icon={Box}
              title="Custom Gifting Solution"
              description="We provide custom gifting solutions using high quality 3d Prints."
            />
          </motion.div>
          <motion.div variants={itemRight}>
            <ServiceCard 
              icon={MessageSquare}
              title="Consultation"
              description="Technical guidance on material selection and design for manufacturability."
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const ServiceCard = ({ icon: Icon, title, description }) => (
  <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-brand-orange/50 transition-all hover:bg-slate-800/60 group">
    <div className="flex items-start gap-6">
      <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
        <Icon className="text-brand-orange" size={24} />
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-brand-orange transition-colors text-slate-100">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

const ScrollReveal = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const useWindowSize = () => {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  React.useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
};

const PortfolioModal = ({ isOpen, onClose, category, images }) => {
  const [viewedImage, setViewedImage] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const { width } = useWindowSize();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  // Responsive sizes
  const cardSize = isMobile ? 220 : isTablet ? 280 : 320;
  const baseRadius = isMobile ? 500 : isTablet ? 700 : 900;
  // Increase radius more aggressively to prevent overlap (using arc length formula)
  const radius = Math.max(baseRadius, (images.length * cardSize) / (Math.PI * 1.5)); 
  const angleStep = 360 / images.length;

  const nextImage = React.useCallback((e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => {
      const nextIdx = (prev + 1) % images.length;
      setViewedImage(images[nextIdx]);
      return nextIdx;
    });
  }, [images]);
  
  const prevImage = React.useCallback((e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => {
      const prevIdx = (prev - 1 + images.length) % images.length;
      setViewedImage(images[prevIdx]);
      return prevIdx;
    });
  }, [images]);

  // Auto-rotation effect
  React.useEffect(() => {
    let interval;
    if (isOpen && !viewedImage && isAutoRotating) {
      interval = setInterval(() => {
        setRotation(prev => prev - 0.15);
      }, 16);
    }
    return () => clearInterval(interval);
  }, [isOpen, viewedImage, isAutoRotating]);

  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (viewedImage) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') setViewedImage(null);
      } else {
        if (e.key === 'Escape') onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, viewedImage, nextImage, prevImage, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-slate-950/98 backdrop-blur-3xl overflow-hidden flex flex-col"
          onClick={onClose}
        >
          {/* Modal Header */}
          <div className="z-[120] flex items-center justify-between p-6 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
            <div className="flex flex-col">
              <h2 className="text-2xl md:text-3xl font-black bg-brand-gradient bg-clip-text text-transparent uppercase tracking-wider">{category}</h2>
              <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Drag to explore • Click image to zoom</p>
            </div>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors bg-slate-900/50 p-3 rounded-full border border-slate-800"
            >
              <X size={24} />
            </button>
          </div>

          {/* 3D Scene Container */}
          <div 
            className={`flex-1 relative flex items-center justify-center ${isMobile ? 'perspective-[1200px]' : 'perspective-[3000px]'}`}
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => setIsAutoRotating(false)}
            onMouseLeave={() => setIsAutoRotating(true)}
          >
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDrag={(_, info) => {
                setRotation(prev => prev + info.delta.x * (isMobile ? 0.2 : 0.1));
              }}
              style={{
                width: isMobile ? '200px' : '300px',
                height: isMobile ? '200px' : '300px',
                position: 'relative',
                transformStyle: 'preserve-3d',
                rotateY: rotation,
              }}
              className="flex items-center justify-center cursor-grab active:cursor-grabbing"
            >
              {images.map((img, idx) => {
                const angle = idx * angleStep;
                // Increase vertical spread to create a proper helix and avoid vertical overlap
                const yOffset = (idx - images.length / 2) * (isMobile ? 35 : 60); 

                return (
                  <div
                    key={idx}
                    style={{
                      position: 'absolute',
                      width: `${cardSize}px`,
                      height: `${cardSize}px`,
                      transform: `rotateY(${angle}deg) translateZ(${radius}px) translateY(${yOffset}px)`,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: isMobile ? 1.05 : 1.15, translateZ: isMobile ? 20 : 50 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="w-full h-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border-2 border-slate-800 bg-slate-900 shadow-2xl transition-colors hover:border-brand-orange group cursor-pointer"
                      onClick={() => {
                        setActiveIndex(idx);
                        setViewedImage(img);
                      }}
                    >
                      <img 
                        src={img} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-brand-gradient opacity-0 group-hover:opacity-20 transition-opacity" />
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Focused Enlarged View Overlay */}
          <AnimatePresence>
            {viewedImage && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[130] flex flex-col items-center justify-center p-4 bg-black/98 backdrop-blur-md"
                onClick={() => setViewedImage(null)}
              >
                <button 
                  className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors p-2 z-[150] bg-slate-900/50 rounded-full"
                  onClick={() => setViewedImage(null)}
                >
                  <X size={40} />
                </button>

                <div className="relative w-full max-w-5xl h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={prevImage}
                    className="absolute left-0 md:-left-24 z-[140] p-6 text-white hover:text-brand-orange transition-all hover:scale-110"
                  >
                    <ChevronLeft size={64} />
                  </button>

                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full h-[85vh] flex items-center justify-center"
                  >
                    <img src={viewedImage} className="max-h-full max-w-full object-contain rounded-xl" />
                  </motion.div>

                  <button 
                    onClick={nextImage}
                    className="absolute right-0 md:-right-24 z-[140] p-6 text-white hover:text-brand-orange transition-all hover:scale-110"
                  >
                    <ChevronRight size={64} />
                  </button>
                </div>

                <div className="absolute bottom-8 px-6 py-2 bg-slate-900 border border-slate-800 rounded-full text-slate-400 font-bold tracking-widest text-sm">
                  {activeIndex + 1} / {images.length}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const categories = [
    { 
      id: 'Fridge Magnets', 
      title: 'Fridge Magnets', 
      mainImage: getCategoryImages('Fridge Magnets').find(u => u.includes('Main')) || getCategoryImages('Fridge Magnets')[0],
      images: getCategoryImages('Fridge Magnets')
    },
    { 
      id: 'Kids Activity', 
      title: 'Kids Activity', 
      mainImage: getCategoryImages('Kids Activity').find(u => u.includes('Main')) || getCategoryImages('Kids Activity')[0],
      images: getCategoryImages('Kids Activity')
    }
  ];

  return (
    <section id="portfolio" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl font-bold mb-16 text-center">Portfolio</h2>
        </ScrollReveal>
        
        <div className="grid md:grid-cols-2 gap-12">
          {categories.map((cat) => (
            <motion.div 
              key={cat.id} 
              whileHover={{ y: -10 }}
              className="relative aspect-video rounded-[2.5rem] overflow-hidden group cursor-pointer border border-slate-800"
              onClick={() => setSelectedCategory(cat)}
            >
              <img 
                src={cat.mainImage} 
                alt={cat.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-12 flex flex-col justify-end">
                <h3 className="text-3xl font-bold mb-2 group-hover:text-brand-orange transition-colors text-slate-100">{cat.title}</h3>
                <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-100 transition-colors">
                  <Maximize2 size={18} />
                  <span className="text-sm font-medium">Click to view {cat.images.length} items</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <PortfolioModal 
        key={selectedCategory?.id || 'none'}
        isOpen={!!selectedCategory} 
        onClose={() => setSelectedCategory(null)}
        category={selectedCategory?.title}
        images={selectedCategory?.images || []}
      />
    </section>
  );
};

const Contact = () => (
  <section id="contact" className="py-24 px-4 bg-slate-900/50">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-4xl font-bold mb-16 text-center">Contact Us</h2>
      </ScrollReveal>
      
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <ScrollReveal>
          <div className="space-y-8">
            <div className="bg-slate-800/30 p-8 rounded-3xl border border-slate-700">
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              <div className="space-y-6">
                <a href="https://wa.me/918605067506" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group p-4 bg-slate-900/50 rounded-2xl hover:border-brand-orange border border-transparent transition-all">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">WhatsApp</p>
                    <p className="text-lg font-semibold">+91 86050 67506</p>
                  </div>
                </a>
                
                <div className="flex items-center gap-4 p-4">
                  <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Location</p>
                    <p className="text-lg font-semibold">Pune, Maharashtra, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="aspect-video rounded-3xl overflow-hidden border border-slate-700">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.1670678683525!2d73.91030547596815!3d18.56649176777176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c1000847d27f%3A0x62a495033c17327a!2s3Dfier!5e0!3m2!1sen!2sin!4v1715175000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="bg-brand-gradient p-1 rounded-3xl h-full">
            <div className="bg-slate-900 p-8 rounded-[1.4rem] h-full">
              <h3 className="text-2xl font-bold mb-6">Drop us a Line</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 focus:border-brand-orange outline-none" />
                <input type="email" placeholder="Your Email" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 focus:border-brand-orange outline-none" />
                <textarea placeholder="Your Message" rows="6" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 focus:border-brand-orange outline-none resize-none"></textarea>
                <button className="w-full py-4 bg-brand-orange rounded-xl font-bold text-lg hover:bg-orange-600 transition-colors shadow-lg shadow-brand-orange/20">Send Message</button>
              </form>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

const QuoteForm = () => {
  const [dragActive, setDragActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="quote" className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center bg-slate-800/30 p-12 rounded-3xl border border-brand-orange/50">
          <div className="w-20 h-20 bg-brand-orange/20 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-orange">
            <Mail size={40} />
          </div>
          <h2 className="text-3xl font-bold mb-4">Request Received!</h2>
          <p className="text-slate-400 mb-8">Our engineers will review your files and get back to you within 24 hours.</p>
          <button onClick={() => setSubmitted(false)} className="px-8 py-3 bg-brand-orange rounded-xl font-bold hover:bg-orange-600 transition-colors">
            Send Another Request
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Request a Quote</h2>
            <p className="text-slate-400">Upload your files for a manual review by our engineering team.</p>
          </div>
        </ScrollReveal>
        
        <form onSubmit={handleSubmit} className="space-y-8 bg-slate-800/30 p-8 rounded-3xl border border-slate-700">
          <div 
            className={`relative p-12 border-2 border-dashed rounded-2xl text-center transition-colors ${
              dragActive ? 'border-brand-orange bg-brand-orange/5' : 'border-slate-600 hover:border-brand-orange/50'
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
          >
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" multiple accept=".stl,.obj,.step" required />
            <Upload className="mx-auto mb-4 text-slate-500" size={40} />
            <p className="text-lg font-medium mb-1">Drop your files here</p>
            <p className="text-sm text-slate-500">Supports .STL, .OBJ, .STEP</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Material Selection</label>
              <select className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 focus:border-brand-orange outline-none">
                <option>PLA (Standard)</option>
                <option>PETG (Durable)</option>
                <option>TPU (Flexible)</option>
                <option>ABS (Industrial)</option>
                <option>Carbon Fiber (Reinforced)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Preferred Color</label>
              <input type="text" placeholder="e.g. Matte Black" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 focus:border-brand-orange outline-none" required />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Email Address</label>
              <input type="email" placeholder="you@example.com" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 focus:border-brand-orange outline-none" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Phone Number</label>
              <input type="tel" placeholder="+91 00000 00000" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 focus:border-brand-orange outline-none" required />
            </div>
          </div>

          <button type="submit" className="w-full py-4 bg-brand-gradient rounded-xl font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-brand-orange/10">
            Submit Request
          </button>
        </form>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 border-t border-slate-800 px-4">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center">
        <img src={Logo} alt="3dfier Logo" className="h-8 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
      </div>
      
      <div className="flex items-center gap-6 text-slate-500">
        <a href="https://www.instagram.com/3dfier/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors"><Instagram size={20} /></a>
        <a href="https://www.youtube.com/@3dfier" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors"><Youtube size={20} /></a>
        <a href="#" className="hover:text-brand-orange transition-colors"><Linkedin size={20} /></a>
      </div>

      <div className="flex flex-col items-center md:items-end gap-2 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <MapPin size={14} />
          <span>Pune, Maharashtra, India</span>
        </div>
        <p>&copy; {new Date().getFullYear()} 3dfier. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/918605067506"
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="fixed bottom-8 right-8 z-[90] w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/20 hover:bg-green-600 transition-colors group"
  >
    <MessageCircle size={32} />
    <span className="absolute right-full mr-4 px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
      Chat with us
    </span>
  </motion.a>
);

const App = () => {
  return (
    <div className="text-slate-100 selection:bg-brand-orange selection:text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      
      <Portfolio />

      <Contact />

      <ScrollReveal>
        <QuoteForm />
      </ScrollReveal>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default App;
