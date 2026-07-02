import { ImageWithFallback } from './figma/ImageWithFallback';
import { Header } from './Header';
import { Footer } from './Footer';
import { Calendar, User, Clock, ArrowRight, Share2, Check } from 'lucide-react';
import { useState } from 'react';

type ArticleDetailPageProps = {
  articleId: number;
  onNavigate: (page: string, articleId?: number) => void;
};

// Blog posts data - same as BlogPage
const blogPosts = [
  {
    id: 1,
    title: 'Ekspor ke Negara Cambodia 26 Juni 2023',
    excerpt: 'PT. Santoso Jaya Tembakau berhasil melakukan ekspor tembakau ke negara Cambodia pada tanggal 26 Juni 2023.',
    author: 'Departemen Ekspor',
    date: '26 Juni 2023',
    readTime: '5 menit',
    category: 'Ekspor',
    image: 'https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Ekspor%20ke%20Negara%20Cambodia%2026%20Juni%202023.jpg?raw=true',
    content: `
      <h3>Ekspor Perdana ke Cambodia</h3>
      <p>PT. Santoso Jaya Tembakau berhasil melakukan ekspor tembakau ke negara Cambodia pada tanggal 26 Juni 2023. Ini merupakan pencapaian penting dalam ekspansi pasar internasional perusahaan ke kawasan Asia Tenggara.</p>
      
      <h3>Pasar Cambodia</h3>
      <p>Cambodia merupakan salah satu pasar potensial untuk produk tembakau berkualitas di kawasan Asia Tenggara. Dengan pertumbuhan industri rokok yang stabil, negara ini menjadi tujuan ekspor strategis bagi PT. Santoso Jaya Tembakau.</p>
      
      <h3>Kualitas Produk yang Diekspor</h3>
      <p>Produk tembakau yang diekspor ke Cambodia telah melalui proses quality control yang ketat untuk memastikan memenuhi standar kualitas internasional. Setiap tahap produksi diawasi dengan cermat untuk menghasilkan produk tembakau premium yang sesuai dengan kebutuhan pasar Cambodia.</p>
      
      <h3>Proses Ekspor</h3>
      <p>Proses ekspor ke Cambodia dilakukan dengan mengikuti regulasi perdagangan internasional dan standar ekspor yang berlaku. Seluruh dokumentasi dan perizinan telah disiapkan dengan lengkap untuk memastikan kelancaran pengiriman produk.</p>
      
      <h3>Membuka Peluang Baru</h3>
      <p>Keberhasilan ekspor ke Cambodia membuka peluang baru bagi PT. Santoso Jaya Tembakau untuk memperluas jaringan distribusi di Asia Tenggara. Ini juga memperkuat posisi perusahaan sebagai produsen tembakau berkualitas yang mampu bersaing di pasar regional.</p>
      
      <h3>Komitmen Ekspansi Regional</h3>
      <p>PT. Santoso Jaya Tembakau berkomitmen untuk terus mengembangkan pasar ekspor di kawasan Asia Tenggara dan negara-negara lainnya. Dengan fokus pada kualitas dan pelayanan terbaik, kami yakin dapat membangun kemitraan jangka panjang dengan mitra bisnis di berbagai negara.</p>
    `
  },
  {
    id: 2,
    title: 'Ekspor Tembakau CUT RAG ke Negara China',
    excerpt: 'PT. Santoso Jaya Tembakau melakukan ekspor kembali ke negara China pada tanggal 25 September 2024.',
    author: 'Departemen Ekspor',
    date: '25 September 2024',
    readTime: '4 menit',
    category: 'Ekspor',
    image: 'https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Ekspor%2025%20September%202025.jpg?raw=true',
    content: `
      <h3>Ekspor Kembali ke China</h3>
      <p>Perusahaan PT. Santoso Jaya Tembakau melakukan ekspor kembali ke negara China pada tanggal 25 September 2024. Ini merupakan kelanjutan dari kerja sama yang telah terjalin sejak ekspor pertama pada 16 Mei 2023, membuktikan konsistensi kualitas produk kami.</p>
      
      <h3>Konsistensi Kualitas Produk</h3>
      <p>Ekspor kembali ini menunjukkan kepercayaan pasar China terhadap kualitas Tembakau CUT RAG yang diproduksi oleh PT. Santoso Jaya Tembakau. Produk kami telah memenuhi standar internasional dan regulasi ketat yang berlaku di China, salah satu pasar tembakau terbesar di dunia.</p>
      
      <h3>Penguatan Hubungan Bisnis</h3>
      <p>Keberhasilan ekspor ini semakin memperkuat hubungan bisnis antara PT. Santoso Jaya Tembakau dengan mitra di China. Kepercayaan yang terbangun melalui konsistensi kualitas produk membuka peluang untuk meningkatkan volume dan frekuensi ekspor di masa mendatang.</p>
      
      <h3>Standar Internasional</h3>
      <p>Seluruh proses produksi dan ekspor dilakukan dengan mengikuti standar internasional yang ketat. Tim quality control kami memastikan setiap batch produk yang diekspor memenuhi spesifikasi yang telah disepakati dan regulasi yang berlaku di negara tujuan.</p>
      
      <h3>Visi Ekspor Global</h3>
      <p>PT. Santoso Jaya Tembakau terus berkomitmen untuk memperluas jangkauan ekspor dan memperkenalkan produk tembakau berkualitas Indonesia ke pasar global. Keberhasilan ekspor berulang ke China menjadi bukti nyata dari komitmen kami dalam menghadirkan produk terbaik.</p>
    `
  },
  {
    id: 3,
    title: 'Ekspor ke Negara China 16 Mei 2023',
    excerpt: 'PT. Santoso Jaya Tembakau pada 16 Mei 2023 berhasil mengekspor Tembakau CUT RAG sebanyak 13 Ton ke negara China.',
    author: 'Departemen Ekspor',
    date: '16 Mei 2023',
    readTime: '4 menit',
    category: 'Ekspor',
    image: 'https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/BG%20Ekspor%20China%2016%20Mei%202023.jpg?raw=true',
    content: `
      <h3>Pencapaian Ekspor Bersejarah</h3>
      <p>Perusahaan PT. Santoso Jaya Tembakau pada 16 Mei 2023 berhasil mengekspor Tembakau CUT RAG sebanyak 13 Ton ke negara China. Pencapaian ini merupakan tonggak penting dalam perjalanan perusahaan untuk memperluas jangkauan pasar internasional.</p>
      
      <h3>Tentang Produk CUT RAG</h3>
      <p>Tembakau CUT RAG merupakan produk tembakau premium yang telah melalui proses pengolahan dan pemotongan dengan standar kualitas tinggi. Produk ini sangat diminati oleh industri rokok di berbagai negara, termasuk China yang merupakan salah satu pasar terbesar di dunia.</p>
      
      <h3>Proses Ekspor</h3>
      <p>Ekspor sebanyak 13 Ton ini merupakan hasil kerja keras tim produksi dan quality control perusahaan dalam memastikan produk memenuhi standar internasional dan regulasi yang berlaku di China. Seluruh proses ekspor dilakukan dengan dokumentasi yang lengkap dan sesuai prosedur perdagangan internasional.</p>
      
      <h3>Dampak Positif</h3>
      <p>Keberhasilan ekspor ini membuka peluang lebih besar bagi PT. Santoso Jaya Tembakau untuk terus meningkatkan volume ekspor ke China dan negara-negara lainnya. Ini juga membuktikan bahwa produk tembakau Indonesia, khususnya dari PT. Santoso Jaya Tembakau, mampu bersaing di pasar global.</p>
      
      <h3>Komitmen Berkelanjutan</h3>
      <p>PT. Santoso Jaya Tembakau berkomitmen untuk terus meningkatkan kualitas produk dan memperluas jaringan ekspor ke berbagai negara di dunia, menjadikan produk tembakau Indonesia dikenal di kancah internasional.</p>
    `
  },
  {
    id: 4,
    title: 'Produk Kami',
    excerpt: 'Kami memiliki berbagai produk tembakau berkualitas mulai dari TSC, TSG, hingga produk rokok SKT dan SKM yang siap memenuhi kebutuhan industri.',
    author: 'Tim Produk',
    date: '1 Desember 2024',
    readTime: '4 menit',
    category: 'Produk',
    image: 'https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/BG%20Blog%20Bagian%20Produk%20Kami.png?raw=true',
    content: `
      <h3>Tembakau Siap Campur (TSC)</h3>
      <p>Kami memiliki berbagai produk tembakau siap giling atau tembakau yang sudah siap di di pakai produksi, seperti TSG Kretek, TSG Mild, TSG Bold, TSG Reguler dan lain sebagainya sesuai dengan pemesanan.</p>
      
      <h3>Tembakau Siap Giling (TSG)</h3>
      <p>Kami memiliki beberapa produk sigaret kretek tangan seperti, 358, Bahamas, Sosrobahu dan Kupu Biru.</p>
      
      <h3>Sigaret Kretek Tangan (SKT)</h3>
      <p>Kami memiliki produk sigaret kretek mesin dengan merk Bahamas yang sudah ekspor ke negara Philippines.</p>
      
      <h3>Sigaret Kretek Mesin (SKM)</h3>
      <p>Produk sigaret kretek mesin kami diproduksi dengan standar kualitas tinggi untuk memenuhi kebutuhan pasar domestik dan internasional.</p>
    `
  },
  {
    id: 5,
    title: 'Pengembangan',
    excerpt: 'Pada tahun 2023, generasi kedua CV. Santoso Jaya Tembakau melanjutkan tongkat estafet kepemimpinan dengan membangun perusahaan kedua.',
    author: 'Manajemen',
    date: '25 November 2024',
    readTime: '5 menit',
    category: 'SDM',
    image: 'https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/BG%20Pengembangans.png?raw=true',
    content: `
      <h3>Ekspansi Tahun 2023</h3>
      <p>Pada tahun 2023, generasi kedua CV. Santoso Jaya Tembakau melanjutkan tongkat estafet kepemimpinan dengan membangun perusahaan kedua yang berlokasi di Pakeongan, Baujeng, Kecamatan Beji, Pasuruan, Jawa Timur 67154. Pada tahun yang sama, perusahaan juga memperluas lini usaha dari produksi tembakau menjadi pengembangan produk rokok Sigaret Kretek Tangan (SKT).</p>
      
      <h3>Transformasi Tahun 2026</h3>
      <p>Pada tahun 2026, ketika perusahaan resmi bertransformasi dari Persekutuan Komanditer (CV) menjadi Perseroan Terbatas (PT), memperkuat fondasi hukum dan tata kelola untuk pertumbuhan jangka panjang.</p>
      
      <p>Di tahun yang sama, perusahaan PT. Santoso Jaya Tembakau melangkah lebih jauh dengan memproduksi Sigaret Kretek Mesin (SKM) dan berhasil melakukan ekspor perdana sebanyak 350 karton merek Bahamas ke Philippines.</p>
    `
  },
  {
    id: 6,
    title: 'Generasi Kedua',
    excerpt: 'Tahun 2020, dengan berbekal Tekat, Keberanian, Kerja cerdas, Kejujuran dan Keimanan, Generasi kedua berkomitmen untuk menaikkan kualitas industri.',
    author: 'Manajemen',
    date: '20 November 2024',
    readTime: '8 menit',
    category: 'Teknologi',
    image: 'https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/BG%20Generasi%20Kedua.png?raw=true',
    content: `
      <h3>Transformasi Tahun 2020</h3>
      <p>Tahun 2020, dengan berbekal Tekat, Keberanian, Kerja cerdas, Kejujuran dan Keimanan, Generasi kedua berkomitmen untuk menaikkan kualitas industri yang awalnya rumahan menjadi Persekutaan Komanditer.</p>
      
      <h3>Ekspansi Global Tahun 2022</h3>
      <p>Tahun 2022, generasi kedua dan tim kami berhasil melakukan ekspor ke berbagai negara mulai tahun 2022 sampai sekarang, memperkenalkan produk tembakau hingga dikenal di penjuru dunia, seperti negara Kamboja, Malaysia, Vietnam, Filipina, Brunei, Singapura, Timor Leste, China, India, Thailand, Taiwan, dan lain sebagainya.</p>
    `
  },
  {
    id: 7,
    title: 'Visi dan Misi',
    excerpt: 'Kami mempunyai komitmen untuk menjadi perusahaan besar pemasok kebutuhan tembakau bagi industri rokok domestik dan internasional.',
    author: 'Manajemen',
    date: '15 November 2024',
    readTime: '6 menit',
    category: 'Kemitraan',
    image: 'https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/BG%20Tentang%20Kami.png?raw=true',
    content: `
      <h3>Visi</h3>
      <p>Kami mempunyai komitmen untuk menjadi perusahaan besar pemasok kebutuhan tembakau bagi industri rokok domestik dan internasional, dengan mengutamakan nilai-nilai inovasi, kepuasan dan kualitas dalam setiap produk.</p>
      
      <h3>Misi</h3>
      <ul>
        <li>Memiliki tata kelola yang profesional dan berintegritas.</li>
        <li>Membuat produk rajangan tembakau yang berkualitas untuk memenuhi harapan konsumen.</li>
        <li>Melakukan pengembangan secara kreatif dan inovatif terkait produk yang dihasilkan perusahaan.</li>
        <li>Memberikan sumbangsih sosial yang saling menguntungkan antara perusahaan dengan masyarakat.</li>
      </ul>
      
      <h3>Nilai Kami</h3>
      <p>Dengan fokus kepada kualitas dan inovasi, perusahaan kami bergerak dalam budidaya, pengolahan, dan pembuatan produk tembakau premium, termasuk beragam jenis rokok. Berkomitmen terhadap keunggulan, PT Santoso Jaya Tembakau memastikan kontrol kualitas yang ketat di setiap tahap—mulai dari pengadaan bahan mentah hingga produksi—untuk menghasilkan produk yang memenuhi standar tinggi.</p>
    `
  },
  {
    id: 8,
    title: 'Sejarah Awal',
    excerpt: 'Berdiri sejak 2006, PT. Santoso Jaya Tembakau berawal sebagai industri rumahan yang didirikan oleh Bapak Santoso.',
    author: 'Manajemen',
    date: '10 November 2024',
    readTime: '5 menit',
    category: 'Prestasi',
    image: 'https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Sejarah%20Awal.png?raw=true',
    content: `
      <p>Berdiri sejak 2006, PT. Santoso Jaya Tembakau berawal sebagai industri rumahan yang didirikan oleh Bapak Santoso, wirausahawan berpengalaman puluhan tahun di bidang tembakau dan rokok.</p>
    `
  }
];

export function ArticleDetailPage({ articleId, onNavigate }: ArticleDetailPageProps) {
  const article = blogPosts.find(post => post.id === articleId);
  const [isCopied, setIsCopied] = useState(false);
  
  // Get other articles (exclude current article)
  const otherArticles = blogPosts.filter(post => post.id !== articleId).slice(0, 4);

  const handleNavigate = (page: string) => {
    onNavigate(page);
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    
    // Fallback method for copying to clipboard
    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    } finally {
      document.body.removeChild(textArea);
    }
  };

  if (!article) {
    return <div>Artikel tidak ditemukan</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Article Image */}
      <section className="relative overflow-hidden">
        {/* Full Screen Background Image */}
        <div 
          className="absolute top-0 left-0 w-full h-[60vh] z-0"
          style={{
            backgroundImage: `url("${article.image}")`,
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-gray-900/70 via-gray-900/50 to-white z-[1]"></div>

        {/* Header Navigation Overlay */}
        <div className="absolute top-0 left-0 w-full z-20">
          <Header currentPage="blog" onNavigate={handleNavigate} />
        </div>

        {/* Article Header Content */}
        <div className="relative z-10 h-[60vh] flex items-end">
          <div className="max-w-4xl mx-auto px-6 w-full pb-12">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {article.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <User size={20} />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={20} />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Share Button */}
          <div className="flex items-center gap-4 mb-12 pb-8 border-b border-gray-200">
            <span className="text-gray-600 font-semibold">Bagikan:</span>
            <button 
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-300 hover:scale-105 shadow-md"
            >
              <Share2 size={18} />
              <span className="text-sm">{isCopied ? 'Tersalin!' : 'Salin Link'}</span>
            </button>
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Back to Blog Button */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <button 
              onClick={() => onNavigate('blog')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <ArrowRight size={20} className="rotate-180" />
              Kembali ke Blog
            </button>
          </div>
        </div>
      </section>

      {/* Other Articles Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-amber-50/30">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Artikel Lainnya
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Baca artikel menarik lainnya dari PT Santoso Jaya Tembakau
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {otherArticles.map((post) => (
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
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold text-gray-800">
                      {post.category}
                    </span>
                  </div>
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

          {/* View All Articles Button */}
          <div className="mt-16 text-center">
            <button 
              onClick={() => onNavigate('blog')}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 hover:scale-105"
            >
              <span>Lihat Semua Artikel</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />

      {/* Custom Styles for Article Content */}
      <style>{`
        .article-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
          color: #374151;
        }
        
        .article-content h3 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #111827;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .article-content ul {
          margin-left: 1.5rem;
          margin-bottom: 1.5rem;
          list-style-type: disc;
        }
        
        .article-content li {
          margin-bottom: 0.75rem;
          line-height: 1.8;
          color: #374151;
        }
        
        .article-content strong {
          color: #111827;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}