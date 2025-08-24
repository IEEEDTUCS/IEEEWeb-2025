import React, { useEffect, useState, useRef } from 'react';
import styles from '/src/styles/your_componentname.module.css';


export default function Chapter() {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    // Observe all sections
    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const setSectionRef = (id) => (el) => {
    sectionRefs.current[id] = el;
  };

  return (
    <>
      {/* CS Chapter */}
      <div 
        id="cs"
        ref={setSectionRef('cs')}
        className={`${styles.gridContainer2} ${styles.sectionContainer}${visibleSections.has('cs') ? ` ${styles.visible}` : ''}`}
        style={{ 
          borderBottom: 'gray solid', 
          margin: '0px 50px 0px 50px',
          backgroundColor : 'white'
        }}
      >
        <div className={`${styles.gridItem2} ${styles.scrollFadeUp}${visibleSections.has('cs') ? ` ${styles.visible}` : ''}`}>
          <br /><br /><br />
          <div className={styles.serviceText}>
            <img 
              height="300"
              src="/your_component_name/CS_IEEE.png"
              className={styles.chapterImage}
              alt="IEEE CS Logo"
            />
          </div>
        </div>

        <div className={`${styles.gridItem2} ${styles.scrollFadeUp} ${styles.delay200}${visibleSections.has('cs') ? ` ${styles.visible}` : ''}`}>
          <br /><br /><br />
          <div className={styles.serviceText}>
            <a>
              <h3 className={`${styles.chapterTitle} ${styles.scrollFadeUp} ${styles.delay100}${visibleSections.has('cs') ? ` ${styles.visible}` : ''}`}>
                IEEE DTU CS CHAPTER
              </h3>
            </a>
            <p className={`${styles.chapterDescription} ${styles.scrollFadeUp} ${styles.delay200}${visibleSections.has('cs') ? ` ${styles.visible}` : ''}`}>
              The IEEE Computer Society is the premier source for information, inspiration, and collaboration in Computer Science and Engineering. IEEE DTU has become affiliated to the IEEE Computer Society and has established its presence in the ever-expanding world of Computer Science. IEEE DTU Computer Society has organized many flagship events like Microhacks, IEEEXtreme, Vihaan and Bulls N' Bears.
            </p>
            <a  
              className={`${styles.btnStroke2} ${styles.scrollFadeUp} ${styles.delay400}${visibleSections.has('cs') ? ` ${styles.visible}` : ''}`}
            >
              Know More
            </a>
            <br /><br />
          </div>
        </div>
      </div>

      {/* PES Chapter */}
      <div 
        id="pes"
        ref={setSectionRef('pes')}
        className={`${styles.gridContainer2} ${styles.sectionContainer}${visibleSections.has('pes') ? ` ${styles.visible}` : ''}`}
        style={{ 
          borderBottom: 'gray solid', 
          margin: '0px 50px 0px 50px',
          backgroundColor : 'white'
        }}
      >
        <div className={`${styles.gridItem2} ${styles.scrollFadeUp}${visibleSections.has('pes') ? ` ${styles.visible}` : ''}`}>
          <br /><br /><br />
          <div className={styles.serviceText}>
            <img 
              height="300"
              src="/your_component_name/PES_IEEE.png"
              className={styles.chapterImage}
              alt="IEEE PES Logo"
            />
          </div>
        </div>

        <div className={`${styles.gridItem2} ${styles.scrollFadeUp} ${styles.delay200}${visibleSections.has('pes') ? ` ${styles.visible}` : ''}`}>
          <br /><br /><br />
          <div className={styles.serviceText}>
            <a>
              <h3 className={`${styles.chapterTitle} ${styles.scrollFadeUp} ${styles.delay100}${visibleSections.has('pes') ? ` ${styles.visible}` : ''}`}>
                IEEE DTU PES-IAS CHAPTER
              </h3>
            </a>
            <p className={`${styles.chapterDescription} ${styles.scrollFadeUp} ${styles.delay200}${visibleSections.has('pes') ? ` ${styles.visible}` : ''}`}>
              The Power & Energy Society (PES) provides the world's largest forum for sharing latest in technological developments in the electric power industry, for developing standards that guide the development and construction of equipment and systems, and for educating members of the industry and the general public. Members of the PES are leaders in this field, and the members gain substantial benefits.
            </p>
            <a  
              className={`${styles.btnStroke2} ${styles.scrollFadeUp} ${styles.delay400}${visibleSections.has('pes') ? ` ${styles.visible}` : ''}`}
            >
              Know More
            </a>
            <br /><br />
          </div>
        </div>
      </div>

      {/* WIE Chapter */}
      <div 
        id="wie"
        ref={setSectionRef('wie')}
        className={`${styles.gridContainer2} ${styles.sectionContainer}${visibleSections.has('wie') ? ` ${styles.visible}` : ''}`}
        style={{ 
          borderBottom: 'gray solid', 
          margin: '0px 50px 0px 50px',
          backgroundColor : 'white'
        }}
      >
        <div className={`${styles.gridItem2} ${styles.scrollFadeUp}${visibleSections.has('wie') ? ` ${styles.visible}` : ''}`}>
          <br /><br /><br />
          <div className={styles.serviceText}>
            <img 
              height="300"
              src="/your_component_name/WIE_IEEE.png"
              className={styles.chapterImage}
              alt="IEEE WIE Logo"
            />
          </div>
        </div>

        <div className={`${styles.gridItem2} ${styles.scrollFadeUp} ${styles.delay200}${visibleSections.has('wie') ? ` ${styles.visible}` : ''}`}>
          <br /><br /><br />
          <div className={styles.serviceText}>
            <a>
              <h3 className={`${styles.chapterTitle} ${styles.scrollFadeUp} ${styles.delay100}${visibleSections.has('wie') ? ` ${styles.visible}` : ''}`}>
                IEEE DTU WIE CHAPTER
              </h3>
            </a>
            <p className={`${styles.chapterDescription} ${styles.scrollFadeUp} ${styles.delay200}${visibleSections.has('wie') ? ` ${styles.visible}` : ''}`}>
              Women in Engineering (WIE) is a global network of IEEE members a devoted to promoting the advancement of women in science and retention of disciplines globally. The vision it holds is that of a vibrant community of women and men collectively using their diverse talents of humanity. In lieu of the certain horrific events in India, IEEE DTU WIE hosted a webinar on Workplace Environment an being none other than Dr. Sharad Kumari
            </p>
            <a  
              className={`${styles.btnStroke2} ${styles.scrollFadeUp} ${styles.delay400}${visibleSections.has('wie') ? ` ${styles.visible}` : ''}`}
            >
              Know More
            </a>
            <br /><br />
          </div>
        </div>
      </div>

      {/* CASS Chapter */}
      <div 
        id="cass"
        ref={setSectionRef('cass')}
        className={`${styles.gridContainer2} ${styles.sectionContainer}${visibleSections.has('cass') ? ` ${styles.visible}` : ''}`}
        style={{ 
          borderBottom: 'gray solid', 
          margin: '0px 50px 0px 50px',
          backgroundColor : 'white'
        }}
      >
        <div className={`${styles.gridItem2} ${styles.scrollFadeUp}${visibleSections.has('cass') ? ` ${styles.visible}` : ''}`}>
          <br /><br /><br />
          <div className={styles.serviceText}>
            <img 
              height="300"
              src="/your_component_name/CASS_IEEE.png"
              className={styles.chapterImage}
              alt="IEEE CASS Logo"
            />
          </div>
        </div>

        <div className={`${styles.gridItem2} ${styles.scrollFadeUp} ${styles.delay200}${visibleSections.has('cass') ? ` ${styles.visible}` : ''}`}>
          <br /><br /><br />
          <div className={styles.serviceText}>
            <a>
              <h3 className={`${styles.chapterTitle} ${styles.scrollFadeUp} ${styles.delay100}${visibleSections.has('cass') ? ` ${styles.visible}` : ''}`}>
                IEEE DTU CASS CHAPTER
              </h3>
            </a>
            <p className={`${styles.chapterDescription} ${styles.scrollFadeUp} ${styles.delay200}${visibleSections.has('cass') ? ` ${styles.visible}` : ''}`}>
              The IEEE Circuits and Systems Society (CASS) focuses on advancing circuits, systems, and signal processing in areas like VLSI design, communications, and embedded technologies. The IEEE DTU CASS Chapter provides a platform for students and professionals to learn, innovate, and collaborate through workshops, seminars, and technical events. By connecting members with global resources and industry experts, the chapter helps foster research, skill development, and professional growth in the field of electronics and system design.
            </p>
            <a  
              className={`${styles.btnStroke2} ${styles.scrollFadeUp} ${styles.delay400}${visibleSections.has('cass') ? ` ${styles.visible}` : ''}`}
            >
              Know More
            </a>
            <br /><br />
          </div>
        </div>
      </div>
    </>
  );
}