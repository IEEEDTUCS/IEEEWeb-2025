import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
// import pdfParse from "pdf-parse";  // Commented out - not needed for ieee.json ingestion
import dotenv from "dotenv";
import { chunkText, chunkRecords } from "./chunker.js";
import { embedBatch } from "./embeddings.js";
import { insertChunk, saveStore, clearStore, getStats } from "./vectorStore.js";

dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../.env") });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, "../../../data");
const IEEE_JSON_PATH = path.resolve(__dirname, "../ieee.json");

// ──────────────────────────────────────────────
// IEEE Global Knowledge — real, factual data
// ──────────────────────────────────────────────
const IEEE_GLOBAL_DATA = [
  {
    id: "ieee_global_founding",
    text: "IEEE (Institute of Electrical and Electronics Engineers) was formed on January 1, 1963, through the merger of the American Institute of Electrical Engineers (AIEE, founded in 1884) and the Institute of Radio Engineers (IRE, founded in 1912). The AIEE was initially focused on electrical power and wired communication, while the IRE specialized in radio and electronic engineering. Their merger created the world's largest technical professional organization. IEEE is headquartered at 3 Park Avenue, New York City, USA, with additional operations centers in Piscataway, New Jersey.",
  },
  {
    id: "ieee_global_mission",
    text: "IEEE's core mission is 'Advancing Technology for Humanity.' The organization is dedicated to advancing technology for the benefit of humanity through its highly cited publications, conferences, technology standards, and professional and educational activities. IEEE's vision is to be essential to the global technical community and to technical professionals everywhere, and to be universally recognized for the contributions of technology and of technical professionals in improving global conditions.",
  },
  {
    id: "ieee_global_membership",
    text: "IEEE has over 460,000 members in more than 190 countries and territories worldwide, making it the world's largest technical professional organization. Members include engineers, scientists, researchers, educators, technologists, and allied professionals. IEEE membership spans across industry, academia, and government. The organization has over 3,000 student branches at colleges and universities in more than 100 countries, and over 300 local sections that bring the IEEE community together at the grassroots level.",
  },
  {
    id: "ieee_global_publications",
    text: "IEEE publishes approximately one-third of the world's technical literature in electrical engineering, computer science, and electronics. This includes over 200 peer-reviewed journals and magazines, such as the Proceedings of the IEEE (the oldest ongoing technical journal, founded in 1913), IEEE Spectrum, and IEEE Transactions in various specialized fields. IEEE also publishes more than 5 million documents in the IEEE Xplore digital library, which hosts journal articles, conference papers, technical standards, and educational courses.",
  },
  {
    id: "ieee_global_xplore",
    text: "IEEE Xplore is one of the world's largest technical digital libraries, containing over 6 million documents including journal articles, conference proceedings, technical standards, eBooks, and educational courses. It serves as the primary discovery and access platform for IEEE and partner publisher content. IEEE Xplore provides access to content from 200+ peer-reviewed journals, 2,000+ annual conferences, 11,000+ technical standards, and more than 5,000 eBooks. It is used by engineers, researchers, and students in over 160 countries.",
  },
  {
    id: "ieee_global_standards",
    text: "IEEE is one of the leading standards-setting organizations in the world, with a portfolio of over 1,300 active standards and more than 900 standards in development. Major IEEE standards include: IEEE 802.3 (Ethernet) — the foundational standard for wired local area networks; IEEE 802.11 (Wi-Fi) — the standard for wireless local area networking; IEEE 754 — the standard for floating-point arithmetic used in virtually all modern computers; IEEE 1547 — standard for interconnecting distributed resources with electric power systems; POSIX (IEEE 1003) — Portable Operating System Interface for Unix compatibility. These standards shape the technological infrastructure used by billions of people daily.",
  },
  {
    id: "ieee_global_wifi_ethernet",
    text: "Two of the most impactful IEEE standards are IEEE 802.11 (Wi-Fi) and IEEE 802.3 (Ethernet). IEEE 802.11, first released in 1997, defines the protocols for wireless local area network (WLAN) communication. Subsequent amendments like 802.11a, 802.11b, 802.11g, 802.11n (Wi-Fi 4), 802.11ac (Wi-Fi 5), 802.11ax (Wi-Fi 6), and 802.11be (Wi-Fi 7) have progressively improved speed, range, and efficiency. IEEE 802.3 (Ethernet), first standardized in 1983, remains the dominant wired networking technology, with speeds evolving from 10 Mbps to 400 Gbps and beyond.",
  },
  {
    id: "ieee_global_societies",
    text: "IEEE operates through 46 technical societies and councils, each focused on a specific area of technology. Major societies include: IEEE Computer Society (the largest, focused on computing and IT), IEEE Communications Society (networking and telecommunications), IEEE Signal Processing Society, IEEE Power & Energy Society, IEEE Robotics and Automation Society, IEEE Circuits and Systems Society, IEEE Solid-State Circuits Society, IEEE Microwave Theory and Technology Society, IEEE Photonics Society, IEEE Control Systems Society, IEEE Engineering in Medicine and Biology Society, and the IEEE Electron Devices Society. Each society provides specialized publications, conferences, and educational programs.",
  },
  {
    id: "ieee_global_conferences",
    text: "IEEE sponsors or co-sponsors more than 2,000 conferences and events annually across the globe. These range from large flagship events to smaller specialized workshops. Notable IEEE conferences include: IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), IEEE International Conference on Communications (ICC), IEEE International Solid-State Circuits Conference (ISSCC), IEEE Globecom, IEEE INFOCOM, IEEE International Conference on Robotics and Automation (ICRA), and the IEEE Power & Energy Society General Meeting. These conferences serve as premier venues for presenting cutting-edge research and networking with industry leaders.",
  },
  {
    id: "ieee_global_education",
    text: "IEEE offers extensive educational programs and resources. IEEE Learning Network provides continuing education courses, tutorials, and webinars for professionals. IEEE also offers certification programs, including the Certified Biometrics Professional and Certified Software Development Professional. IEEE TryEngineering is an educational platform aimed at inspiring students aged 8-18 to explore careers in engineering and technology. IEEE offers scholarships and fellowships to support students and researchers, including the IEEE Richard E. Merwin Student Scholarship and IEEE Life Members' Fellowship.",
  },
  {
    id: "ieee_global_humanitarian",
    text: "IEEE has robust humanitarian technology programs. IEEE SIGHT (Special Interest Group on Humanitarian Technology) mobilizes IEEE volunteers to develop sustainable technology solutions for underserved communities worldwide. The IEEE Humanitarian Activities Committee (HAC) provides funding and support for projects addressing challenges in disaster response, healthcare, education, and sustainable development. IEEE Smart Village focuses on bringing electricity and internet access to off-grid communities in developing countries, impacting millions of lives.",
  },
  {
    id: "ieee_global_awards",
    text: "IEEE presents numerous prestigious awards recognizing contributions to technology and engineering. The IEEE Medal of Honor is the highest IEEE award, recognizing exceptional contributions to IEEE fields of interest. Other major awards include the IEEE Edison Medal, IEEE Alexander Graham Bell Medal, IEEE Medal for Environmental and Safety Technologies, IEEE Founders Medal, and IEEE John von Neumann Medal. The elevation to IEEE Fellow is the highest grade of IEEE membership, recognized as a prestigious honor in the technical community, limited to no more than 0.1% of voting members annually.",
  },
  {
    id: "ieee_global_regions",
    text: "IEEE organizes its global activities through 10 geographic regions. Regions 1-6 cover the United States, Region 7 covers Canada, Region 8 covers Europe, Middle East, and Africa, Region 9 covers Latin America, and Region 10 covers Asia and the Pacific. Each region is further divided into sections, which are the primary organizational unit for member activities. IEEE Region 10 (Asia-Pacific) is one of the largest, spanning from Pakistan to New Zealand and including countries like India, China, Japan, South Korea, Australia, and Southeast Asian nations.",
  },
  {
    id: "ieee_global_student_branches",
    text: "IEEE Student Branches are the grassroots organizational units at colleges and universities. With over 3,000 student branches in more than 100 countries, they connect students with the broader IEEE community. Student branches organize technical talks, workshops, hackathons, and social events. Benefits of IEEE student membership include access to IEEE Xplore, networking opportunities, career resources, scholarships, participation in global competitions like IEEEXtreme, and discounted conference registrations. Student branches can form student chapters affiliated with specific IEEE societies.",
  },
  {
    id: "ieee_global_computer_society",
    text: "The IEEE Computer Society (IEEE CS) is the largest of IEEE's 46 societies, with a membership of over 60,000 computing professionals worldwide. Founded in 1946, it is dedicated to advancing the theory, practice, and application of computer and information processing science and technology. IEEE CS publishes influential journals including IEEE Transactions on Pattern Analysis and Machine Intelligence, IEEE Software, IEEE Computer, and IEEE Transactions on Computers. It also sponsors top-tier conferences like CVPR, ICCV, ISCA, and SC (Supercomputing).",
  },
  {
    id: "ieee_global_pes",
    text: "The IEEE Power & Energy Society (PES) is one of the oldest and largest technical societies within IEEE, dedicated to the science and practice of electric power generation, transmission, distribution, and utilization. PES has over 40,000 members and sponsors numerous conferences including the IEEE PES General Meeting and IEEE PES Innovative Smart Grid Technologies. It develops key standards for power systems and is instrumental in advancing sustainable energy, smart grid technologies, and renewable energy integration.",
  },
  {
    id: "ieee_global_wie",
    text: "IEEE Women in Engineering (WIE) is one of the largest international professional organizations dedicated to promoting women engineers and scientists and inspiring girls around the world to follow their academic interests in a career in engineering. Founded in 1994, WIE has a global network of IEEE members who are committed to addressing the gender gap in STEM fields. WIE facilitates mentorship programs, networking events, leadership conferences, and pre-university outreach activities to inspire and support women in technical fields.",
  },
  {
    id: "ieee_global_cas",
    text: "The IEEE Circuits and Systems Society (CASS) covers the theory, analysis, design, implementation, and practical applications of circuits, systems, and related algorithms. CASS focuses on areas including analog and digital circuits, signal processing systems, neural networks, biomedical circuits, power electronics circuits, VLSI systems, and sensory systems. Its flagship conferences include IEEE ISCAS (International Symposium on Circuits and Systems) and IEEE ISICAS (International Symposium on Integrated Circuits and Systems).",
  },
  {
    id: "ieee_india_details",
    text: "IEEE has a very strong presence in India with over 100,000 members, making it one of the largest national groups within IEEE. The IEEE India Council, established in 1976, coordinates IEEE activities across the country through 13 sections. India has one of the highest numbers of IEEE student branches globally, reflecting the country's emphasis on engineering education. IEEE India organizes INDICON, the flagship conference of the IEEE India Council, and runs various programs including the IEEE India Blended Learning Program, Xtreme coding competition participation, and regional innovation challenges.",
  },
  {
    id: "ieee_ieeextreme_global",
    text: "IEEEXtreme is a global 24-hour programming competition organized by IEEE. In IEEEXtreme, teams of IEEE student members, advised by an IEEE member, compete in a race against the clock to solve a set of programming problems. The competition is open to IEEE student members worldwide and has grown to include thousands of teams from hundreds of universities. Problems are designed to test algorithmic thinking, data structures, optimization, and real-world problem solving across multiple programming languages.",
  },
  {
    id: "ieee_hackathons_general",
    text: "IEEE student branches worldwide organize hackathons as a key technical activity. These hackathons typically run for 24-48 hours and challenge participants to build innovative solutions to real-world problems. Common themes include healthcare, sustainability, fintech, education, and artificial intelligence. IEEE hackathons provide mentorship from industry professionals, sponsor prizes, and offer networking opportunities. They emphasize practical skills like teamwork, rapid prototyping, and presentation alongside technical coding abilities.",
  },
];

// ──────────────────────────────────────────────
// Main ingestion pipeline
// ──────────────────────────────────────────────
async function main() {
  console.log("🚀 Starting IEEE DTU RAG ingestion pipeline...\n");

  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY not found in .env — aborting.");
    process.exit(1);
  }

  clearStore();
  const allChunks = [];

  // ──── Step 1: Process PDFs ────
  console.log("📄 Processing PDFs from /data ...");
  const pdfFiles = fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.toLowerCase().endsWith(".pdf"));

  for (const file of pdfFiles) {
    const filePath = path.join(DATA_DIR, file);
    console.log(`   📖 Skipping PDF (pdf-parse not installed): ${file}`);
    // PDF processing disabled - only using ieee.json for now
    // Uncomment below and install pdf-parse if you need PDF ingestion
    /*
    try {
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);
      const text = pdfData.text || "";

      if (text.trim().length < 50) {
        console.log(`   ⚠️  Skipped (too little text): ${file}`);
        continue;
      }

      const chunks = chunkText(text, `PDF: ${file}`);
      allChunks.push(...chunks);
      console.log(`   ✅ ${file}: ${chunks.length} chunks (${text.length} chars)`);
    } catch (err) {
      console.error(`   ❌ Failed to parse ${file}: ${err.message}`);
    }
    */
  }

  // ──── Step 2: Process ieee.json ────
  console.log("\n📋 Processing ieee.json ...");
  try {
    const ieeeData = JSON.parse(fs.readFileSync(IEEE_JSON_PATH, "utf-8"));
    const jsonChunks = chunkRecords(ieeeData, "ieee.json");
    allChunks.push(...jsonChunks);
    console.log(`   ✅ ieee.json: ${jsonChunks.length} chunks`);
  } catch (err) {
    console.error(`   ❌ Failed to process ieee.json: ${err.message}`);
  }

  // ──── Step 3: IEEE Global Knowledge ────
  console.log("\n🌐 Adding IEEE global knowledge ...");
  const globalChunks = chunkRecords(IEEE_GLOBAL_DATA, "IEEE Global");
  allChunks.push(...globalChunks);
  console.log(`   ✅ IEEE Global: ${globalChunks.length} chunks`);

  // ──── Step 4: Generate embeddings ────
  console.log(`\n🧮 Generating embeddings for ${allChunks.length} chunks ...`);
  const texts = allChunks.map((c) => c.text);

  try {
    const embeddings = await embedBatch(texts);

    // ──── Step 5: Store in vector database ────
    for (let i = 0; i < allChunks.length; i++) {
      insertChunk({
        text: allChunks[i].text,
        source: allChunks[i].source,
        embedding: embeddings[i],
      });
    }

    saveStore();

    // ──── Summary ────
    const stats = getStats();
    console.log("\n" + "═".repeat(50));
    console.log("✅ INGESTION COMPLETE");
    console.log("═".repeat(50));
    console.log(`   Total chunks: ${stats.totalChunks}`);
    console.log("   Sources:");
    for (const [source, count] of Object.entries(stats.sources)) {
      console.log(`     • ${source}: ${count} chunks`);
    }
    console.log("═".repeat(50));
  } catch (err) {
    console.error(`\n❌ Embedding generation failed: ${err.message}`);
    console.error(
      "   Make sure your GEMINI_API_KEY is valid and has text-embedding-004 access."
    );
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal error during ingestion:", err);
  process.exit(1);
});
