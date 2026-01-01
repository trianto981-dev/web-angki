import React, { useState, useMemo } from 'react';
import { ShoppingCart, Search, Trash2, X, Check, Info, Sparkles, Send, Loader2 } from 'lucide-react';

// --- CONFIGURATION ---
const apiKey = ""; // API Key disediakan oleh environment runtime

// Data Inventaris Lengkap (Sorted by ID)
const initialLegoData = [
  // --- EXISTING DATA ---
  { id: "8072", name: "Sea Jet (Atlantis)", angkiPrice: "Rp100.000", findLink: "https://www.tokopedia.com/find/lego-8072" },
  { id: "10707", name: "Red Creativity Box (Classic)", angkiPrice: "Rp100.000", findLink: "https://www.tokopedia.com/find/lego-10707" },
  { id: "10709", name: "Orange Creativity Box (Classic)", angkiPrice: "Rp80.000", findLink: "https://www.tokopedia.com/find/lego-10709" },
  { id: "10850", name: "My First Cakes (Duplo)", angkiPrice: "Rp110.000", findLink: "https://www.tokopedia.com/find/lego-10850" },
  { id: "10860", name: "My First Race Car (Duplo)", angkiPrice: "Rp240.000", findLink: "https://www.tokopedia.com/find/lego-10860" },
  { id: "11006", name: "Creative Blue Bricks (Classic)", angkiPrice: "Rp80.000", findLink: "https://www.tokopedia.com/anugrahshop/product?q=11006&srp_component_id=02.01.00.00&srp_page_id=70895&srp_page_title=AnugrahShopTokopedia&navsource=shop" },
  { id: "11007", name: "Creative Green Bricks (Classic)", angkiPrice: "Rp80.000", findLink: "https://www.tokopedia.com/find/lego-11007" },
  { id: "11008", name: "Bricks and Houses (Classic)", angkiPrice: "Rp300.000", findLink: "https://www.tokopedia.com/anugrahshop/product?q=11008&srp_component_id=02.01.00.00&srp_page_id=70895&srp_page_title=AnugrahShopTokopedia&navsource=shop" },
  { id: "20139", name: "MBA Kit 4: Invention Designer (Master Builder Academy)", angkiPrice: "Rp480.000", findLink: "https://www.tokopedia.com/find/lego-20139" },
  { id: "21068", name: "Shanghai Skyline (Architecture)", angkiPrice: "Rp1.320.000", findLink: "https://www.tokopedia.com/anugrahshop/product?q=21068&srp_component_id=02.01.00.00&srp_page_id=70895&srp_page_title=AnugrahShopTokopedia&navsource=shop" },
  
  // --- POLYBAGS & PROMOS ---
  { id: "30221", name: "Fire Car (City Polybag)", angkiPrice: "Rp80.000", findLink: "https://www.tokopedia.com/find/lego-30221" },
  { id: "30226", name: "Police Helicopter (City Polybag)", angkiPrice: "Rp90.000", findLink: "https://www.tokopedia.com/find/lego-30226" },
  { id: "30229", name: "Repair Lift (City Polybag)", angkiPrice: "Rp90.000", findLink: "https://www.tokopedia.com/find/lego-30229" },
  { id: "30303", name: "The Joker Bumper Car (DC Polybag)", angkiPrice: "Rp120.000", findLink: "https://www.tokopedia.com/find/lego-30303" },
  { id: "30357", name: "Road Worker (City Polybag)", angkiPrice: "Rp80.000", findLink: "https://www.tokopedia.com/find/lego-30357" },
  { id: "30358", name: "Dragster (City Polybag)", angkiPrice: "Rp80.000", findLink: "https://www.tokopedia.com/find/lego-30358" },
  { id: "30359", name: "Police Water Plane (City Polybag)", angkiPrice: "Rp80.000", findLink: "https://www.tokopedia.com/find/lego-30359" },
  { id: "30361", name: "Fire ATV (City Polybag)", angkiPrice: "Rp70.000", findLink: "https://www.tokopedia.com/find/lego-30361" },
  { id: "30372", name: "Robin's Mini Fortrex (Nexo Knights)", angkiPrice: "Rp90.000", findLink: "https://www.tokopedia.com/find/lego-30372" },
  { id: "30421", name: "Skybound Plane (Ninjago)", angkiPrice: "Rp90.000", findLink: "https://www.tokopedia.com/find/lego-30421" },
  { id: "30473", name: "Racer (Creator Polybag)", angkiPrice: "Rp80.000", findLink: "https://www.tokopedia.com/find/lego-30473" },
  { id: "30524", name: "The Mini Batwing (Batman Movie)", angkiPrice: "Rp90.000", findLink: "https://www.tokopedia.com/find/lego-30524" },
  { id: "30528", name: "Mini Master-Building MetalBeard (Movie 2)", angkiPrice: "Rp90.000", findLink: "https://www.tokopedia.com/find/lego-30528" },
  { id: "30532", name: "Turbo Track Racer (Ninjago)", angkiPrice: "Rp90.000", findLink: "https://www.tokopedia.com/find/lego-30532" },
  { id: "30535", name: "Fire Flight (Ninjago)", angkiPrice: "Rp80.000", findLink: "https://www.tokopedia.com/find/lego-30535" },
  { id: "30541", name: "Build a Duck (Classic)", angkiPrice: "Rp80.000", findLink: "https://www.tokopedia.com/find/lego-30541" },
  { id: "30545", name: "Fish Free Builds (Creator)", angkiPrice: "Rp90.000", findLink: "https://www.tokopedia.com/find/lego-30545" },
  { id: "30573", name: "Santa (Creator)", angkiPrice: "Rp90.000", findLink: "https://www.tokopedia.com/find/lego-30573" },
  
  // --- STANDARD & TECHNIC ---
  { id: "31051", name: "Lighthouse Point (Creator 3-in-1)", angkiPrice: "Rp900.000", findLink: "https://www.tokopedia.com/find/lego-31051" },
  { id: "31090", name: "Underwater Robot (Creator 3-in-1)", angkiPrice: "Rp570.000", findLink: "https://www.tokopedia.com/find/lego-31090" },
  { id: "40355", name: "BYGGLEK Box Set of 3 (IKEA)", angkiPrice: "Rp350.000", findLink: "https://www.tokopedia.com/find/lego-40355" },
  { id: "40356", name: "BYGGLEK Large (IKEA)", angkiPrice: "Rp320.000", findLink: "https://www.tokopedia.com/find/lego-40356" },
  { id: "40357", name: "BYGGLEK Medium (IKEA)", angkiPrice: "Rp370.000", findLink: "https://www.tokopedia.com/anugrahshop/product?q=40357&srp_component_id=02.01.00.00&srp_page_id=70895&srp_page_title=AnugrahShopTokopedia&navsource=shop" },
  { id: "42101", name: "Buggy (Technic)", angkiPrice: "Rp200.000", findLink: "https://www.tokopedia.com/find/lego-42101" },
  { id: "42102", name: "Mini Claas Xerion (Technic)", angkiPrice: "Rp120.000", findLink: "https://www.tokopedia.com/find/lego-42102" },
  
  // --- MMMB & PROMO (40xxx) ---
  { id: "40105", name: "Gingerbread House (MMMB)", angkiPrice: "Rp180.000", findLink: "https://www.tokopedia.com/find/lego-40105" },
  { id: "40125", name: "Santa's Visit (Seasonal)", angkiPrice: "Rp180.000", findLink: "https://www.tokopedia.com/find/lego-40125" },
  { id: "40126", name: "Alien (MMMB)", angkiPrice: "Rp150.000", findLink: "https://www.tokopedia.com/find/lego-40126" },
  { id: "40127", name: "Vampire (MMMB)", angkiPrice: "Rp150.000", findLink: "https://www.tokopedia.com/find/lego-40127" },
  { id: "40128", name: "Robot (MMMB)", angkiPrice: "Rp150.000", findLink: "https://www.tokopedia.com/find/lego-40128" },
  { id: "40129", name: "UFO (MMMB)", angkiPrice: "Rp150.000", findLink: "https://www.tokopedia.com/find/lego-40129" },
  { id: "40130", name: "Koala (MMMB)", angkiPrice: "Rp150.000", findLink: "https://www.tokopedia.com/find/lego-40130" },
  { id: "40148", name: "Year of the Sheep (Seasonal)", angkiPrice: "Rp300.000", findLink: "https://www.tokopedia.com/find/lego-40148" },
  { id: "40190", name: "Ferrari F138 (Shell)", angkiPrice: "Rp150.000", findLink: "https://www.tokopedia.com/find/lego-40190" },
  { id: "40192", name: "Ferrari 250 GTO (Shell)", angkiPrice: "Rp150.000", findLink: "https://www.tokopedia.com/find/lego-40192" },
  { id: "40193", name: "Ferrari 512 S (Shell)", angkiPrice: "Rp150.000", findLink: "https://www.tokopedia.com/find/lego-40193" },
  { id: "40194", name: "Finish Line & Podium (Shell)", angkiPrice: "Rp180.000", findLink: "https://www.tokopedia.com/find/lego-40194" },
  { id: "40195", name: "Shell Station (Shell)", angkiPrice: "Rp200.000", findLink: "https://www.tokopedia.com/find/lego-40195" },
  { id: "40196", name: "Shell Tanker (Shell)", angkiPrice: "Rp180.000", findLink: "https://www.tokopedia.com/find/lego-40196" },
  { id: "40209", name: "Calendar (MMMB)", angkiPrice: "Rp150.000", findLink: "https://www.tokopedia.com/find/lego-40209" },
  { id: "40214", name: "Photographer (MMMB)", angkiPrice: "Rp150.000", findLink: "https://www.tokopedia.com/find/lego-40214" },
  { id: "40216", name: "Viking (MMMB)", angkiPrice: "Rp150.000", findLink: "https://www.tokopedia.com/find/lego-40216" },
  { id: "40217", name: "Werewolf (MMMB)", angkiPrice: "Rp150.000", findLink: "https://www.tokopedia.com/find/lego-40217" },
  { id: "40218", name: "Fox (MMMB)", angkiPrice: "Rp150.000", findLink: "https://www.tokopedia.com/find/lego-40218" },
  { id: "40240", name: "Raccoon (MMMB)", angkiPrice: "Rp150.000", findLink: "https://www.tokopedia.com/find/lego-40240" },
  { id: "40243", name: "Race Car (MMMB)", angkiPrice: "Rp150.000", findLink: "https://www.tokopedia.com/find/lego-40243" },
  
  // --- MIXELS (Rp180.000 Fixed) ---
  { id: "41555", name: "Busto (Mixels)", angkiPrice: "Rp180.000", findLink: "https://www.tokopedia.com/find/lego-41555" },
  { id: "41556", name: "Tiketz (Mixels)", angkiPrice: "Rp180.000", findLink: "https://www.tokopedia.com/find/lego-41556" },
  { id: "41562", name: "Trumpsy (Mixels)", angkiPrice: "Rp180.000", findLink: "https://www.tokopedia.com/find/lego-41562" },
  { id: "41572", name: "Gobbol (Mixels)", angkiPrice: "Rp180.000", findLink: "https://www.tokopedia.com/find/lego-41572" },
  { id: "41573", name: "Sweepz (Mixels)", angkiPrice: "Rp180.000", findLink: "https://www.tokopedia.com/find/lego-41573" },
  { id: "41574", name: "Compax (Mixels)", angkiPrice: "Rp180.000", findLink: "https://www.tokopedia.com/find/lego-41574" },
  { id: "41578", name: "Screeno (Mixels)", angkiPrice: "Rp180.000", findLink: "https://www.tokopedia.com/find/lego-41578" },
  { id: "41579", name: "Camsta (Mixels)", angkiPrice: "Rp180.000", findLink: "https://www.tokopedia.com/find/lego-41579" },
  { id: "41580", name: "Myx (Mixels)", angkiPrice: "Rp180.000", findLink: "https://www.tokopedia.com/find/lego-41580" },

  // --- CITY & OTHERS ---
  { id: "60072", name: "Demolition Starter Set (City)", angkiPrice: "Rp240.000", findLink: "https://www.tokopedia.com/find/lego-60072" },
  { id: "60105", name: "Fire ATV (City)", angkiPrice: "Rp120.000", findLink: "https://www.tokopedia.com/find/lego-60105" },
  { id: "60114", name: "Race Boat (City)", angkiPrice: "Rp160.000", findLink: "https://www.tokopedia.com/find/lego-60114" },
  { id: "60127", name: "Prison Island Starter Set (City)", angkiPrice: "Rp240.000", findLink: "https://www.tokopedia.com/find/lego-60127" },
  { id: "60134", name: "Fun in the Park People Pack (City)", angkiPrice: "Rp770.000", findLink: "https://www.tokopedia.com/anugrahshop/product?q=60134&srp_component_id=02.01.00.00&srp_page_id=70895&srp_page_title=AnugrahShopTokopedia&navsource=shop" },
  { id: "60213", name: "Dock Side Fire (City)", angkiPrice: "Rp290.000", findLink: "https://www.tokopedia.com/find/lego-60213" },
  { id: "70230", name: "Ice Bear Tribe Pack (Chima)", angkiPrice: "Rp400.000", findLink: "https://www.tokopedia.com/find/lego-70230" },
  { id: "70359", name: "Lance vs. Lightning (Nexo Knights)", angkiPrice: "Rp500.000", findLink: "https://www.tokopedia.com/find/lego-70359" },
  { id: "70361", name: "Macy's Bot Drop Dragon (Nexo Knights)", angkiPrice: "Rp300.000", findLink: "https://www.tokopedia.com/find/lego-70361" },
  { id: "70363", name: "Battle Suit Macy (Nexo Knights)", angkiPrice: "Rp160.000", findLink: "https://www.tokopedia.com/find/lego-70363" },
  { id: "70903", name: "The Riddler Riddle Racer (Batman)", angkiPrice: "Rp790.000", findLink: "https://www.tokopedia.com/find/lego-70903" },
  { id: "70908", name: "The Scuttler (Batman)", angkiPrice: "Rp1.400.000", findLink: "https://www.tokopedia.com/find/lego-70908" },
  
  // --- STAR WARS (Microfighters & Battle Packs) ---
  { id: "75101", name: "First Order Special Forces TIE Fighter (Star Wars)", angkiPrice: "Rp1.440.000", findLink: "https://www.tokopedia.com/find/lego-75101" },
  { id: "75113", name: "Rey (Buildable Figure)", angkiPrice: "Rp180.000", findLink: "https://www.tokopedia.com/find/lego-75113" },
  { id: "75115", name: "Poe Dameron (Buildable Figure)", angkiPrice: "Rp180.000", findLink: "https://www.tokopedia.com/find/lego-75115" },
  { id: "75116", name: "Finn (Buildable Figure)", angkiPrice: "Rp180.000", findLink: "https://www.tokopedia.com/find/lego-75116" },
  { id: "75129", name: "Wookiee Gunship Microfighter (Star Wars)", angkiPrice: "Rp200.000", findLink: "https://www.tokopedia.com/find/lego-75129" },
  { id: "75130", name: "AT-DP Microfighter (Star Wars)", angkiPrice: "Rp200.000", findLink: "https://www.tokopedia.com/find/lego-75130" },
  { id: "75148", name: "Encounter on Jakku (Star Wars)", angkiPrice: "Rp830.000", findLink: "https://www.tokopedia.com/find/lego-75148" },
  { id: "75149", name: "Resistance X-Wing Fighter (Star Wars)", angkiPrice: "Rp1.670.000", findLink: "https://www.tokopedia.com/find/lego-75149" },
  { id: "75165", name: "Imperial Trooper Battle Pack (Star Wars)", angkiPrice: "Rp350.000", findLink: "https://www.tokopedia.com/find/lego-75165" },
  { id: "75167", name: "Bounty Hunter Speeder Bike Battle Pack (Star Wars)", angkiPrice: "Rp350.000", findLink: "https://www.tokopedia.com/find/lego-75167" },
  { id: "75193", name: "Millennium Falcon Microfighter (Star Wars)", angkiPrice: "Rp200.000", findLink: "https://www.tokopedia.com/find/lego-75193" },
  { id: "75194", name: "First Order TIE Fighter Microfighter (Star Wars)", angkiPrice: "Rp200.000", findLink: "https://www.tokopedia.com/find/lego-75194" },
  { id: "75197", name: "First Order Specialists Battle Pack (Star Wars)", angkiPrice: "Rp300.000", findLink: "https://www.tokopedia.com/find/lego-75197" },
  { id: "75198", name: "Tatooine Battle Pack (Star Wars)", angkiPrice: "Rp300.000", findLink: "https://www.tokopedia.com/find/lego-75198" },
  { id: "75529", name: "Elite Praetorian Guard (Buildable Figure)", angkiPrice: "Rp450.000", findLink: "https://www.tokopedia.com/find/lego-75529" },
  { id: "75876", name: "Porsche 919 Hybrid & 917K Pit Lane (Speed Champions)", angkiPrice: "Rp2.350.000", findLink: "https://www.tokopedia.com/find/lego-75876" },
  
  // --- SUPER HEROES & MIGHTY MICROS ---
  { id: "76070", name: "Mighty Micros: Wonder Woman vs. Doomsday (DC Super Heroes)", angkiPrice: "Rp240.000", findLink: "https://www.tokopedia.com/find/lego-76070" },
  { id: "76073", name: "Mighty Micros: Wolverine vs. Magneto (Marvel Super Heroes)", angkiPrice: "Rp240.000", findLink: "https://www.tokopedia.com/find/lego-76073" },
  { id: "76089", name: "Mighty Micros: Scarlet Spider vs. Sandman (Marvel Super Heroes)", angkiPrice: "Rp200.000", findLink: "https://www.tokopedia.com/find/lego-76089" },
  { id: "76090", name: "Mighty Micros: Star-Lord vs. Nebula (Marvel Super Heroes)", angkiPrice: "Rp200.000", findLink: "https://www.tokopedia.com/find/lego-76090" },
  { id: "76091", name: "Mighty Micros: Thor vs. Loki (Marvel Super Heroes)", angkiPrice: "Rp200.000", findLink: "https://www.tokopedia.com/find/lego-76091" },
  { id: "76092", name: "Mighty Micros: Batman vs. Harley Quinn (DC Super Heroes)", angkiPrice: "Rp200.000", findLink: "https://www.tokopedia.com/find/lego-76092" },
  { id: "76093", name: "Mighty Micros: Nightwing vs. The Joker (DC Super Heroes)", angkiPrice: "Rp200.000", findLink: "https://www.tokopedia.com/find/lego-76093" },
  { id: "76094", name: "Mighty Micros: Supergirl vs. Brainiac (DC Super Heroes)", angkiPrice: "Rp200.000", findLink: "https://www.tokopedia.com/find/lego-76094" },
  { id: "76096", name: "Superman & Krypto Team-Up (DC Super Heroes)", angkiPrice: "Rp350.000", findLink: "https://www.tokopedia.com/find/lego-76096" },
  { id: "76171", name: "Miles Morales Mech Armour (Marvel)", angkiPrice: "Rp170.000", findLink: "https://www.tokopedia.com/find/lego-76171" },
  { id: "76198", name: "Spider-Man & Doc Ock Mech Battle (Marvel)", angkiPrice: "Rp400.000", findLink: "https://www.tokopedia.com/find/lego-76198" },
  { id: "76201", name: "Captain Carter & The Hydra Stomper (Marvel)", angkiPrice: "Rp440.000", findLink: "https://www.tokopedia.com/find/lego-76201" },
  { id: "76202", name: "Wolverine Mech Armour (Marvel)", angkiPrice: "Rp220.000", findLink: "https://www.tokopedia.com/find/lego-76202" },
  { id: "76204", name: "Black Panther Mech Armour (Marvel)", angkiPrice: "Rp170.000", findLink: "https://www.tokopedia.com/find/lego-76204" },
  { id: "76243", name: "Rocket Mech Armour (Marvel)", angkiPrice: "Rp200.000", findLink: "https://www.tokopedia.com/find/lego-76243" },
  { id: "9781409326052", name: "Brickmaster Battle for the Stolen Crystals (Book)", angkiPrice: "Rp220.000", findLink: "https://www.tokopedia.com/find/lego-9781409326052" }
];

const GeminiModal = ({ isOpen, onClose, legoSet }) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [customQuery, setCustomQuery] = useState('');

  if (!isOpen || !legoSet) return null;

  const callGemini = async (prompt) => {
    setLoading(true);
    setResponse('');
    setError('');
    
    try {
      const payload = {
        contents: [{ parts: [{ text: prompt }] }]
      };

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Gagal menghubungi Gemini API');

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, tidak ada respon.";
      setResponse(text);
    } catch (err) {
      setError('Terjadi kesalahan saat memproses permintaan AI. Pastikan API Key valid.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (actionType) => {
    let prompt = "";
    switch (actionType) {
      case 'description':
        prompt = `Buatkan deskripsi penjualan yang menarik dan profesional untuk Tokopedia dalam Bahasa Indonesia untuk set LEGO ${legoSet.name} (Set #${legoSet.id}). Kondisi barang adalah MISB (Mint In Sealed Box) / Baru. Tekankan bahwa ini adalah item koleksi yang layak dibeli. Sertakan detail singkat tentang set ini jika memungkinkan.`;
        break;
      case 'investment':
        prompt = `Analisa potensi investasi untuk set LEGO ${legoSet.name} (Set #${legoSet.id}). Apakah set ini populer di kalangan kolektor? Apa keunikannya? Berikan pandangan umum tentang nilai masa depannya dalam Bahasa Indonesia.`;
        break;
      case 'custom':
        if (!customQuery.trim()) return;
        prompt = `Tentang LEGO set ${legoSet.name} (#${legoSet.id}): ${customQuery}. Jawab dalam Bahasa Indonesia.`;
        break;
      default:
        return;
    }
    callGemini(prompt);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white border-4 border-indigo-600 rounded-xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-start mb-4 border-b pb-4">
          <div>
            <h2 className="text-2xl font-black uppercase text-indigo-700 flex items-center gap-2">
              <Sparkles className="text-yellow-500" fill="currentColor" />
              Asisten LEGO Pintar
            </h2>
            <p className="text-stone-500 text-sm mt-1">Membahas: <span className="font-bold text-stone-800">{legoSet.name} (#{legoSet.id})</span></p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button 
              onClick={() => handleAction('description')}
              className="flex items-center justify-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 py-3 px-4 rounded-lg font-bold transition-colors border border-indigo-200"
            >
              📝 Buat Deskripsi Jual
            </button>
            <button 
              onClick={() => handleAction('investment')}
              className="flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 py-3 px-4 rounded-lg font-bold transition-colors border border-emerald-200"
            >
              📈 Analisa Investasi
            </button>
          </div>

          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Tanya hal lain tentang set ini..."
              className="flex-1 border-2 border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 font-medium"
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAction('custom')}
            />
            <button 
              onClick={() => handleAction('custom')}
              disabled={!customQuery.trim() || loading}
              className="bg-stone-900 text-white p-3 rounded-lg hover:bg-black disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>

          <div className="min-h-[200px] bg-stone-50 rounded-xl p-6 border border-stone-200 relative">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400">
                <Loader2 className="animate-spin mb-2" size={32} />
                <span className="text-xs font-bold uppercase tracking-widest">Sedang Berpikir...</span>
              </div>
            ) : error ? (
              <div className="text-red-500 font-bold text-center p-4 bg-red-50 rounded-lg">
                {error}
              </div>
            ) : response ? (
              <div className="prose prose-sm max-w-none text-stone-800 whitespace-pre-wrap leading-relaxed">
                {response}
              </div>
            ) : (
              <div className="text-center text-stone-400 py-8 italic text-sm">
                Pilih aksi di atas atau ketik pertanyaan untuk memulai analisa AI.
              </div>
            )}
          </div>
        </div>
        
        <div className="text-center text-[10px] text-stone-400 uppercase tracking-widest font-bold">
          Powered by Gemini 2.5 Flash
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [legoList, setLegoList] = useState(initialLegoData);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [aiSet, setAiSet] = useState(null);

  const sortedData = useMemo(() => {
    // Custom sort to handle ISBNs (longer strings) and regular set numbers
    return [...legoList].sort((a, b) => {
      const numA = parseInt(a.id);
      const numB = parseInt(b.id);
      
      // If both are numbers, sort numerically
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB;
      }
      // Fallback to string comparison for non-numeric IDs
      return a.id.localeCompare(b.id);
    });
  }, [legoList]);

  const filteredData = sortedData.filter(item => 
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setLegoList(legoList.filter(item => item.id !== id));
    setDeletingId(null);
  };

  return (
    <div className="min-h-screen bg-stone-100 p-4 md:p-8 font-sans text-stone-900">
      <div className="max-w-7xl mx-auto text-left relative">
        <header className="mb-8 border-b-4 border-stone-900 pb-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-4">
              <h1 className="text-4xl font-black uppercase italic leading-none tracking-tighter">Harga Toccotoys LEGO v5.8</h1>
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Set No / Nama..."
                  className="block w-full pl-10 pr-3 py-2 border-2 border-stone-900 rounded-md bg-white placeholder-stone-400 focus:outline-none sm:text-sm font-bold uppercase"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="text-right">
              <div className="bg-stone-900 text-white px-3 py-1 inline-flex items-center gap-2 rounded mb-2">
                <Info size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">SOP v5.6 Clean Layout</span>
              </div>
              <p className="text-stone-500 text-[9px] font-bold uppercase tracking-widest italic block italic tracking-tighter">Mean Priority | No Margin | Round Down 10k</p>
            </div>
          </div>
        </header>

        {deletingId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 text-center">
            <div className="bg-white border-4 border-stone-900 p-8 max-w-md w-full shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] animate-in fade-in zoom-in duration-200">
              <X className="mx-auto text-red-600 mb-4" size={48} />
              <h2 className="text-xl font-black uppercase italic mb-2 tracking-tight leading-none">Are you sure about deleting this entry?</h2>
              <p className="text-stone-400 text-xs font-bold mb-8 uppercase tracking-widest">Set #{deletingId} will be removed from list Boss.</p>
              <div className="flex gap-4">
                <button onClick={() => handleDelete(deletingId)} className="flex-1 bg-red-600 text-white font-black py-4 uppercase tracking-tighter hover:bg-red-700 transition-all flex items-center justify-center gap-2">
                  <Check size={20} /> YES
                </button>
                <button onClick={() => setDeletingId(null)} className="flex-1 bg-stone-900 text-white font-black py-4 uppercase tracking-tighter hover:bg-black transition-all flex items-center justify-center gap-2">
                  <X size={20} /> NO
                </button>
              </div>
            </div>
          </div>
        )}

        <GeminiModal 
          isOpen={!!aiSet} 
          onClose={() => setAiSet(null)} 
          legoSet={aiSet} 
        />

        <div className="bg-white shadow-2xl overflow-hidden border-2 border-stone-200 rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-stone-900 text-white text-[10px] uppercase font-black">
                <tr>
                  <th className="p-4 tracking-widest text-center border-r border-stone-800">Set No</th>
                  <th className="p-4 tracking-widest text-center border-r border-stone-800">Preview</th>
                  <th className="p-4 tracking-widest">Lego Set Name</th>
                  <th className="p-4 tracking-widest text-center whitespace-nowrap">Angki Price</th>
                  <th className="p-4 tracking-widest text-center">Link</th>
                  <th className="p-4 tracking-widest text-center">AI</th>
                  <th className="p-4 tracking-widest text-center">Hapus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => {
                    const imageUrl = `https://images.lego.com/formats/pimg/${item.id.charAt(0)}/${item.id.charAt(1)}/${item.id.charAt(2)}/${item.id}.jpg?format=jpg&width=200`;
                    return (
                      <tr key={item.id} className="hover:bg-stone-50 transition-colors group">
                        <td className="p-4 text-center font-black text-lg border-r border-stone-50">{item.id}</td>
                        <td className="p-4">
                          <div className="w-14 h-14 mx-auto bg-stone-50 rounded-lg border border-stone-200 p-1 flex items-center justify-center overflow-hidden shadow-inner group-hover:scale-110 transition-transform">
                            <img src={imageUrl} alt={item.id} className="max-w-full max-h-full object-contain"
                              onError={(e) => { e.target.src = `https://images.lego.com/formats/pimg/${item.id}.jpg?format=jpg&width=200`; }} />
                          </div>
                        </td>
                        <td className="p-4 text-xs font-black uppercase text-stone-700 tracking-tight leading-tight">{item.name}</td>
                        <td className="p-4 text-center">
                          <span className="bg-blue-600 text-white px-4 py-2 rounded font-black text-sm shadow-md whitespace-nowrap inline-block tracking-tighter">
                            {item.angkiPrice}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <a href={item.findLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-10 h-10 bg-stone-900 text-white rounded-lg hover:bg-black transition-all shadow-md active:scale-90">
                            <ShoppingCart size={18} />
                          </a>
                        </td>
                        <td className="p-4 text-center">
                          <button 
                            onClick={() => setAiSet(item)} 
                            className="inline-flex items-center justify-center w-10 h-10 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-md active:scale-90"
                            title="Tanya AI tentang set ini"
                          >
                            <Sparkles size={18} />
                          </button>
                        </td>
                        <td className="p-4 text-center">
                          <button onClick={() => setDeletingId(item.id)} className="inline-flex items-center justify-center w-10 h-10 border-2 border-red-100 text-red-500 rounded-lg hover:bg-red-600 hover:text-white transition-all">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="p-16 text-center text-stone-300 font-black uppercase text-sm italic tracking-[0.5em] bg-stone-50">
                      Empty Result Boss.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <footer className="mt-6 flex justify-between items-center text-[9px] font-bold text-stone-400 uppercase tracking-[0.2em]">
          <div>DIRECT LINKS VERIFIED | NO GOOGLE SEARCH PREFIX</div>
          <div>Total Active: {filteredData.length} Sets</div>
        </footer>
      </div>
    </div>
  );
};

export default App;