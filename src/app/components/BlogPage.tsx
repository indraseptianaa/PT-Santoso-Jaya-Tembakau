import { ImageWithFallback } from './figma/ImageWithFallback';
import { Header } from './Header';
import { Footer } from './Footer';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { useState } from 'react';

type BlogPageProps = {
  onNavigate: (page: string, articleId?: number) => void;
};

// Mock blog data dengan 8 gradasi warna dari orange hingga teal
const blogPosts = [
  {
    id: 1,
    title: 'Ekspor ke Negara Cambodia 26 Juni 2023',
    excerpt: 'PT. Santoso Jaya Tembakau berhasil melakukan ekspor tembakau ke negara Cambodia pada tanggal 26 Juni 2023.',
    author: 'Departemen Ekspor',
    date: '26 Juni 2023',
    readTime: '5 menit',
    category: 'Ekspor',
    image: '/Ekspor%20ke%20Negara%20Cambodia%2026%20Juni%202023.jpg',
    gradient: 'from-indigo-500/90 to-indigo-600/90'
  },
  {
    id: 2,
    title: 'Ekspor Tembakau CUT RAG ke Negara China',
    excerpt: 'PT. Santoso Jaya Tembakau melakukan ekspor kembali ke negara China pada tanggal 25 September 2024.',
    author: 'Departemen Ekspor',
    date: '25 September 2024',
    readTime: '4 menit',
    category: 'Ekspor',
    image: '/Ekspor%2025%20September%202025.jpg',
    gradient: 'from-emerald-500/90 to-emerald-600/90'
  },
  {
    id: 3,
    title: 'Ekspor ke Negara China 16 Mei 2023',
    excerpt: 'PT. Santoso Jaya Tembakau pada 16 Mei 2023 berhasil mengekspor Tembakau CUT RAG sebanyak 13 Ton ke negara China.',
    author: 'Departemen Ekspor',
    date: '16 Mei 2023',
    readTime: '4 menit',
    category: 'Ekspor',
    image: '/BG%20Ekspor%20China%2016%20Mei%202023.jpg',
    gradient: 'from-red-500/90 to-red-600/90'
  },
  {
    id: 4,
    title: 'Produk Kami',
    excerpt: 'Kami memiliki berbagai produk tembakau berkualitas mulai dari TSC, TSG, hingga produk rokok SKT dan SKM yang siap memenuhi kebutuhan industri.',
    author: 'Tim Produk',
    date: '1 Desember 2024',
    readTime: '4 menit',
    category: 'Produk',
    image: '/BG%20Blog%20Bagian%20Produk%20Kami.png',
    gradient: 'from-orange-500/90 to-amber-600/90'
  },
  {
    id: 5,
    title: 'Pengembangan',
    excerpt: 'Pada tahun 2023, generasi kedua CV. Santoso Jaya Tembakau melanjutkan tongkat estafet kepemimpinan dengan membangun perusahaan kedua.',
    author: 'Manajemen',
    date: '25 November 2024',
    readTime: '5 menit',
    category: 'SDM',
    image: '/BG%20Pengembangans.png',
    gradient: 'from-blue-500/90 to-blue-600/90'
  },
  {
    id: 6,
    title: 'Generasi Kedua',
    excerpt: 'Tahun 2020, dengan berbekal Tekat, Keberanian, Kerja cerdas, Kejujuran dan Keimanan, Generasi kedua berkomitmen untuk menaikkan kualitas industri.',
    author: 'Manajemen',
    date: '20 November 2024',
    readTime: '8 menit',
    category: 'Teknologi',
    image: '/BG%20Generasi%20Kedua.png',
    gradient: 'from-purple-500/90 to-purple-600/90'
  },
  {
    id: 7,
    title: 'Visi dan Misi',
    excerpt: 'Kami mempunyai komitmen untuk menjadi perusahaan besar pemasok kebutuhan tembakau bagi industri rokok domestik dan internasional.',
    author: 'Manajemen',
    date: '15 November 2024',
    readTime: '6 menit',
    category: 'Kemitraan',
    image: '/BG%20Tentang%20Kami.png',
    gradient: 'from-cyan-500/90 to-cyan-600/90'
  },
  {
    id: 8,
    title: 'Sejarah Awal',
    excerpt: 'Berdiri sejak 2006, PT. Santoso Jaya Tembakau berawal sebagai industri rumahan yang didirikan oleh Bapak Santoso.',
    author: 'Manajemen',
    date: '10 November 2024',
    readTime: '5 menit',
    category: 'Prestasi',
    image: '/Sejarah%20Awal.png',
    gradient: 'from-teal-500/90 to-teal-600/90'
  }
];

export function BlogPage({ onNavigate }: BlogPageProps) {
  const [visiblePosts, setVisiblePosts] = useState(4);
  
  const handleNavigate = (page: string) => {
    onNavigate(page);
  };

  const handleLoadMore = () => {
    setVisiblePosts(prev => Math.min(prev + 4, blogPosts.length));
  };

  const showLoadMoreButton = visiblePosts < blogPosts.length;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Full Screen */}
      <section className="relative overflow-hidden">
        {/* Full Screen Background Image with Parallax Effect - Starts from absolute browser top */}
        <div 
          className="absolute top-0 left-0 w-full h-screen z-0"
          style={{
            backgroundImage: 'url("/BG%20Blog.png")',
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
          <Header currentPage="blog" onNavigate={handleNavigate} />
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Content */}
              <div className="flex flex-col justify-center p-6 md:p-12 lg:p-16">
                {/* Title */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Blog
                </h2>

                {/* Subtitle */}
                <h3 className="text-2xl md:text-3xl text-amber-100 mb-4">
                  Berita & Artikel Terkini
                </h3>

                {/* Description */}
                <p className="text-lg md:text-xl text-amber-50 mb-8 leading-relaxed">
                  Temukan informasi terbaru seputar perusahaan PT. Santoso Jaya Tembakau
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

      {/* Blog Posts Grid Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-amber-50/30">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Artikel Terbaru
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ikuti perkembangan terkini dari PT Santoso Jaya Tembakau
            </p>
          </div>

          {/* Blog Grid - 8 Cards with gradient colors */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {blogPosts.slice(0, visiblePosts).map((post) => (
              <article 
                key={post.id}
                className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                onClick={() => onNavigate('article-detail', post.id)}
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Category Badge - Removed */}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h4 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
                    {post.title}
                  </h4>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={16} />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={16} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User size={16} />
                        <span>{post.author}</span>
                      </div>
                      
                      {/* Read More */}
                      <div className="flex items-center gap-2 text-orange-600 font-semibold group-hover:gap-3 transition-all duration-300">
                        <span className="text-sm">Baca</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Section */}
          {showLoadMoreButton && (
            <div className="mt-16 text-center">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 hover:scale-105" onClick={handleLoadMore}>
                <span className="flex items-center gap-2">
                  Lihat Lebih Banyak Artikel
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-12 shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Dapatkan Update Terbaru
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Berlangganan newsletter kami untuk mendapatkan informasi terkini seputar produk dan berita perusahaan
            </p>
            
            {/* Newsletter Form */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 px-6 py-4 rounded-full border-2 border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:border-white transition-all duration-300"
              />
              <button className="px-8 py-4 bg-white text-orange-600 rounded-full font-semibold hover:bg-amber-50 transition-all duration-300 hover:scale-105 shadow-lg">
                Berlangganan
              </button>
            </div>

            <p className="text-sm text-white/70 mt-6">
              Kami menghargai privasi Anda. Email Anda tidak akan dibagikan kepada pihak ketiga.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
