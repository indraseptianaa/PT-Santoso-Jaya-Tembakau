import { ImageWithFallback } from './figma/ImageWithFallback';
import { Header } from './Header';
import { Footer } from './Footer';
import { useState, useRef, useEffect } from 'react';
import { Pause, Play, Volume2 } from 'lucide-react';

type TentangKamiPageProps = {
  onNavigate: (page: string) => void;
  onNavigateToLogin?: () => void;
  onNavigateToSignup?: () => void;
};

export function TentangKamiPage({ onNavigate, onNavigateToLogin, onNavigateToSignup }: TentangKamiPageProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Load YouTube IFrame API
  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
  }, []);

  const togglePlayPause = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const message = isVideoPlaying ? '{"event":"command","func":"pauseVideo","args":""}' : '{"event":"command","func":"playVideo","args":""}';
      iframe.contentWindow?.postMessage(message, '*');
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const message = isMuted ? '{"event":"command","func":"unMute","args":""}' : '{"event":"command","func":"mute","args":""}';
      iframe.contentWindow?.postMessage(message, '*');
      setIsMuted(!isMuted);
    }
  };

  const handleNavigate = (page: string) => {
    onNavigate(page);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Full Screen */}
      <section className="relative overflow-hidden">
        {/* Full Screen Background Image with Parallax Effect - Starts from absolute browser top */}
        <div 
          className="absolute top-0 left-0 w-full h-screen z-0"
          style={{
            backgroundImage: 'url("/BG%20Tentang%20Kami.png")',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        >
        </div>

        {/* Gradient Overlay from Left (Brown/Amber) */}
        <div className="absolute top-0 left-0 w-full h-screen bg-gradient-to-r from-orange-500 from-0% via-amber-500/90 via-10% via-amber-400/60 via-18% to-transparent to-25% z-[1]"></div>

        {/* Header Navigation Overlay - Same as Landing Page */}
        <div className="absolute top-0 left-0 w-full z-20">
          <Header currentPage="tentang-kami" onNavigate={handleNavigate} onNavigateToLogin={onNavigateToLogin} onNavigateToSignup={onNavigateToSignup} />
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Content */}
              <div className="flex flex-col justify-center p-6 md:p-12 lg:p-16">
                {/* Title */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Tentang Kami
                </h2>

                {/* Subtitle */}
                <h3 className="text-2xl md:text-3xl text-amber-100 mb-4">
                  PT Santoso Jaya Tembakau
                </h3>

                {/* Description */}
                <p className="text-lg md:text-xl text-amber-50 mb-8 leading-relaxed">
                  Kami adalah perusahaan tembakau dan produk turunan tembakau di Indonesia yang berkomitmen menghadirkan produk berkualitas tinggi dengan standar internasional dan tradisi keunggulan
                </p>
              </div>

              {/* Right side - empty for image to show through */}
              <div></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Visi & Misi Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12">
            {/* Visi - with Parallax Background Image */}
            <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-lg overflow-hidden group aspect-[4/3] md:aspect-video">
              {/* Parallax Background Image */}
              <div 
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: 'url("/BG%20Visi.png")',
                  backgroundAttachment: 'fixed',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
              >
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-[1]"></div>

              {/* Content */}
              <div className="relative z-10 p-6 md:p-12 h-full flex flex-col justify-end">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">Visi Kami</h3>
                <p className="text-base md:text-lg text-white/90 leading-relaxed">
                  Kami mempunyai komitmen untuk menjadi perusahaan besar pemasok kebutuhan tembakau bagi industri rokok domestik dan internasional, dengan mengutamakan nilai-nilai inovasi, kepuasan dan kualitas dalam setiap produk.
                </p>
              </div>
            </div>

            {/* Misi - with Parallax Background Image */}
            <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-lg overflow-hidden group aspect-[4/3] md:aspect-video">
              {/* Parallax Background Image */}
              <div 
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: 'url("/BG%20Misi.png")',
                  backgroundAttachment: 'fixed',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
              >
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-[1]"></div>

              {/* Content */}
              <div className="relative z-10 p-6 md:p-12 h-full flex flex-col justify-end">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">Misi Kami</h3>
                <ul className="space-y-2 md:space-y-3 text-base md:text-lg text-white/90">
                  <li className="flex items-start gap-3">
                    <span className="text-white mt-1">â€¢</span>
                    <span>Memiliki tata kelola yang profesional dan berintegritas.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-white mt-1">â€¢</span>
                    <span>Membuat produk rajangan tembakau yang berkualitas untuk memenuhi harapan konsumen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-white mt-1">â€¢</span>
                    <span>Melakukan pengembangan secara kreatif dan inovatif terkait produk yang dihasilkan perusahaan.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-white mt-1">â€¢</span>
                    <span>Memberikan sumbangsih sosial yang saling menguntungkan antara perusahaan dengan masyarakat.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sejarah Singkat Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Sejarah Kami
            </h2>
            <p className="text-xl text-gray-600">
              Sejarah Singkat Perjalanan Kami
            </p>
          </div>
        </div>
      </section>

      {/* Sejarah 2006 - Image Right, Content Left */}
      <section className="py-0 px-0 relative">
        <div className="max-w-full mx-auto">
          {/* Background Image with Parallax Effect */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url("/Sejarah%20Awal.png")',
              backgroundAttachment: 'fixed',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          >
          </div>

          {/* Gradient Overlay from Left (Brown/Amber) */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 from-0% via-amber-500/90 via-10% via-amber-400/60 via-18% to-transparent to-25% z-[1]"></div>

          {/* Content Grid */}
          <div className="relative z-10 grid md:grid-cols-2 gap-0 min-h-[600px]">
            {/* Left Content */}
            <div className="flex flex-col justify-center p-12 md:p-16 lg:p-24">
              {/* Title */}
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Sejarah Awal
              </h3>

              {/* Description */}
              <p className="text-lg text-amber-50 leading-relaxed">
                Berdiri sejak 2006, PT. Santoso Jaya Tembakau berawal sebagai industri rumahan yang didirikan oleh Bapak Santoso, wirausahawan berpengalaman puluhan tahun di bidang tembakau dan rokok.
              </p>
            </div>

            {/* Right side - empty for image to show through */}
            <div></div>
          </div>
        </div>
      </section>

      {/* Sejarah 2020 - Image Left, Content Right (Zigzag) */}
      <section className="py-0 px-0 relative mt-20">
        <div className="max-w-full mx-auto">
          {/* Background Image with Parallax Effect */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url("/BG%20Generasi%20Kedua.png")',
              backgroundAttachment: 'fixed',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          >
          </div>

          {/* Gradient Overlay from Right (Brown/Amber) - Reversed */}
          <div className="absolute inset-0 bg-gradient-to-l from-orange-500 from-0% via-amber-500/90 via-10% via-amber-400/60 via-18% to-transparent to-25% z-[1]"></div>

          {/* Content Grid */}
          <div className="relative z-10 grid md:grid-cols-2 gap-0 min-h-[600px]">
            {/* Left side - empty for image to show through */}
            <div></div>

            {/* Right Content */}
            <div className="flex flex-col justify-center p-12 md:p-16 lg:p-24">
              {/* Title */}
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Generasi Kedua
              </h3>

              {/* Description */}
              <div className="space-y-4">
                <p className="text-lg text-amber-50 leading-relaxed">
                  Tahun 2020, dengan berbekal; Tekat, Keberanian, Kerja cerdas, Kejujuran dan Keimanan, Generasi kedua berkomitmen untuk menaikkan kualitas industri yang awalnya rumahan menjadi Persekutuan Komanditer.
                </p>
                <p className="text-lg text-amber-50 leading-relaxed">
                  Tahun 2022, generasi kedua dan tim kami berhasil melakukan ekspor ke berbagai negara mulai tahun 2022 sampai sekarang, memperkenalkan produk tembakau hingga dikenal di penjuru dunia, seperti negara Kamboja, Malaysia, Vietnam, Filipina, Brunei, Singapura, Timor Leste, China, India, Thailand, Taiwan, dan lain sebagainya.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sejarah 2025 - Image Right, Content Left */}
      <section className="py-0 px-0 relative mt-20">
        <div className="max-w-full mx-auto">
          {/* Background Image with Parallax Effect */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url("/BG%20Pengembangans.png")',
              backgroundAttachment: 'fixed',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          >
          </div>

          {/* Gradient Overlay from Left (Brown/Amber) */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 from-0% via-amber-500/90 via-10% via-amber-400/60 via-18% to-transparent to-25% z-[1]"></div>

          {/* Content Grid */}
          <div className="relative z-10 grid md:grid-cols-2 gap-0 min-h-[600px]">
            {/* Left Content */}
            <div className="flex flex-col justify-center p-12 md:p-16 lg:p-24">
              {/* Title */}
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Pengembangan
              </h3>

              {/* Description */}
              <div className="space-y-4">
                <p className="text-lg text-amber-50 leading-relaxed">
                  Pada tahun 2023, generasi kedua CV. Santoso Jaya Tembakau melanjutkan tongkat estafet kepemimpinan dengan membangun perusahaan kedua yang berlokasi di Pakeongan, Baujeng, Kecamatan Beji, Pasuruan, Jawa Timur 67154.
                </p>
                <p className="text-lg text-amber-50 leading-relaxed">
                  Pada tahun yang sama, perusahaan juga memperluas lini usaha dari produksi tembakau menjadi pengembangan produk rokok Sigaret Kretek Tangan (SKT).
                </p>
                <p className="text-lg text-amber-50 leading-relaxed">
                  Pada tahun 2026, ketika perusahaan resmi bertransformasi dari Persekutuan Komanditer (CV) menjadi Perseroan Terbatas (PT), memperkuat fondasi hukum dan tata kelola untuk pertumbuhan jangka panjang.
                </p>
                <p className="text-lg text-amber-50 leading-relaxed">
                  Di tahun yang sama, perusahaan PT.Santoso Jaya Tembakau melangkah lebih jauh dengan memproduksi Sigaret Kretek Mesin (SKM) dan berhasil melakukan ekspor perdana sebanyak 350 karton merek Bahamas ke Philippines.
                </p>
              </div>
            </div>

            {/* Right side - empty for image to show through */}
            <div></div>
          </div>
        </div>
      </section>

      {/* Nilai Perusahaan Section - Clean White Background */}
      <section className="py-20 px-6 bg-white mt-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nilai-Nilai Kami
            </h2>
            <p className="text-xl text-gray-600">
              Prinsip yang Memandu Setiap Langkah Kami
            </p>
          </div>

          {/* 4 Cards Grid - Portrait 9:16 Aspect Ratio */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 - Integritas */}
            <div 
              className="relative overflow-hidden rounded-2xl aspect-[9/16] group"
            >
              <ImageWithFallback
                src="/BG%20INTEGRITAS.png"
                alt="Integritas"
                className="w-full h-full object-cover"
              />
              
              {/* Default Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              {/* Default Content - Title Only */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Integritas</h3>
              </div>

              {/* Hover Overlay - Slide from Left with Brown Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 flex flex-col justify-center p-8">
                <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-4">Integritas</h3>
                <p className="text-white leading-relaxed">
                  Berkomitmen pada kejujuran dan transparansi dalam setiap aspek bisnis. Kami membangun kepercayaan melalui tindakan yang konsisten dan bertanggung jawab.
                </p>
              </div>
            </div>

            {/* Card 2 - Kualitas */}
            <div 
              className="relative overflow-hidden rounded-2xl aspect-[9/16] group"
            >
              <ImageWithFallback
                src="/BG%20KUALITAS.png"
                alt="Kualitas"
                className="w-full h-full object-cover"
              />
              
              {/* Default Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              {/* Default Content - Title Only */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Kualitas</h3>
              </div>

              {/* Hover Overlay - Slide from Left with Brown Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 flex flex-col justify-center p-8">
                <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-4">Kualitas</h3>
                <p className="text-white leading-relaxed">
                  Mengutamakan standar kualitas tertinggi dalam setiap produk. Kami tidak pernah berkompromi dalam menghadirkan produk terbaik untuk pelanggan kami.
                </p>
              </div>
            </div>

            {/* Card 3 - Inovasi */}
            <div 
              className="relative overflow-hidden rounded-2xl aspect-[9/16] group"
            >
              <ImageWithFallback
                src="/BG%20INOVASI.png"
                alt="Inovasi"
                className="w-full h-full object-cover"
              />
              
              {/* Default Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              {/* Default Content - Title Only */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Inovasi</h3>
              </div>

              {/* Hover Overlay - Slide from Left with Brown Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 flex flex-col justify-center p-8">
                <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-4">Inovasi</h3>
                <p className="text-white leading-relaxed">
                  Terus berinovasi untuk menghadirkan solusi terbaik. Kami mendorong kreativitas dan pemikiran progresif dalam setiap aspek operasional.
                </p>
              </div>
            </div>

            {/* Card 4 - Kolaborasi */}
            <div 
              className="relative overflow-hidden rounded-2xl aspect-[9/16] group"
            >
              <ImageWithFallback
                src="/BG%20KOLABORASI.png"
                alt="Kolaborasi"
                className="w-full h-full object-cover"
              />
              
              {/* Default Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              {/* Default Content - Title Only */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Kolaborasi</h3>
              </div>

              {/* Hover Overlay - Slide from Left with Brown Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 flex flex-col justify-center p-8">
                <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-4">Kolaborasi</h3>
                <p className="text-white leading-relaxed">
                  Membangun kerjasama yang kuat dengan semua stakeholder. Kami percaya bahwa kesuksesan datang dari kolaborasi yang harmonis dan saling mendukung.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program CSR Section - Full Page Video Background */}
      <section className="relative overflow-hidden mt-20">
        {/* YouTube Video Background - Responsive Cover */}
        <div className="absolute inset-0 w-full h-full z-0">
          <iframe
            ref={iframeRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh]"
            src="https://www.youtube.com/embed/zqwYt6CRXKY?si=IrRzuzF51vipmXAN&autoplay=1&mute=1&loop=1&controls=0&showinfo=0&modestbranding=1&playlist=zqwYt6CRXKY&enablejsapi=1"
            title="CSR Program Background"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        {/* Amber Overlay for readability - from left (same color as footer) */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-500/60 via-amber-500/50 via-orange-500/30 to-transparent z-[1]"></div>

        {/* Content */}
        <div className="relative z-10 h-screen flex items-center">
          <div className="max-w-7xl mx-auto w-full px-6">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Content */}
              <div className="flex flex-col justify-center p-6 md:p-12 lg:p-16">
                {/* Title */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
                  Corporate Social Responsibility
                </h2>

                {/* Description */}
                <p className="text-lg md:text-xl text-amber-50 leading-relaxed mb-6">
                  Kami percaya bahwa kehadiran perusahaan harus memberikan manfaat langsung yang dapat dirasakan oleh warga.
                </p>

                <p className="text-lg md:text-xl text-amber-50 leading-relaxed">
                  Melalui program CSR kami, kami berfokus pada aksi sosial dan bantuan kemanusiaan untuk meringankan beban ekonomi serta meningkatkan kesejahteraan masyarakat. Kegiatan kami meliputi penyaluran bantuan pangan (sembako) secara berkala dan pemberian santunan sosial, sebagai wujud syukur dan tanggung jawab kami.
                </p>
              </div>

              {/* Right side - empty for video to show through */}
              <div></div>
            </div>
          </div>
        </div>

        {/* Video Controls */}
        <div className="absolute bottom-8 right-8 z-10 flex gap-3">
          <button
            onClick={togglePlayPause}
            className="group relative bg-white/20 backdrop-blur-md border border-white/30 p-4 rounded-full hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
            aria-label={isVideoPlaying ? "Pause video" : "Play video"}
          >
            {isVideoPlaying ? (
              <Pause size={24} className="text-white" />
            ) : (
              <Play size={24} className="text-white" />
            )}
          </button>

          <button
            onClick={toggleMute}
            className="group relative bg-white/20 backdrop-blur-md border border-white/30 p-4 rounded-full hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            <Volume2 size={24} className={`text-white ${isMuted ? 'opacity-50' : 'opacity-100'}`} />
            {isMuted && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-white rotate-45"></div>
            )}
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
