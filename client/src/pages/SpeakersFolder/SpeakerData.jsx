import lama from '../../Images/speaker/try3.png'

const SpeakerData = [
    {
        id: 2,
        name: "His Holiness Dalai Lama",
        lectureTitle: "Human Apporach To World Peace",
        desc: "His Holiness the Dalai Lama is a man of peace. In 1989 he was awarded the Nobel Peace Prize for his non-violent struggle for the liberation of Tibet. He has consistently advocated policies of non-violence, even in the face of extreme aggression.",
        img : "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202107/dalailama1_1200x768_0_1200x768.jpeg?size=690:388",
        youtubeLink: "https://www.youtube.com/watch?v=3E4naquW2lQ"
    }, 
    {
        id: 3,
        name: "Dr. APJ Abdul Kalam",
        lectureTitle: "Creativity and Youth Power",
        desc: "APJ Abdul Kalam, renowned as India's 'Missile Man' was a visionary scientist and the 11th President of India. His work in space and defense technology, propelled India's scientific advancements. His work has been an inspiration that continues to shape India's future.",
        img : "https://hips.hearstapps.com/hmg-prod/images/president-apj-abdul-kalam-during-a-education-summit-news-photo-1701184753.jpg",
        youtubeLink: "https://www.youtube.com/watch?v=eKzHY4tJPVIi"
    },
    {
        id: 4,
        name: "A. R. Rahman",
        lectureTitle: "My Story",
        desc: "A. R. Rahman, a prolific composer and musician, has left an indelible mark on the world of music with his innovative compositions that blend Eastern and Western influences seamlessly.He won many awards including Oscars and Grammy Awards.",
        img: "https://in.hellomagazine.com/images/027d-172af7a62ccc-50a8d38bacf0-1000/horizontal-800/ar-rahman.png",
        youtubeLink: "https://www.youtube.com/watch?v=dpT5i4_CigA"
    }, 
    {
        id: 5,
        name: "Kailash Satyarthi",
        lectureTitle: "Fight for Child Rights: A Story of My Life",
        desc: "Kailash Satyarthi is a renowned Indian social activist who has dedicated his life to combating child labor and advocating for children's rights. His organisation, Bachpan Bachao Andolan, has rescued thousands of children from slavery and exploitation. He won Nobel Peace Prize in 2014 for it.",
        img : "https://blogassets.leverageedu.com/blog/wp-content/uploads/2020/06/06174812/Kailash-Satyarthi-Education-1.jpg",
        youtubeLink: "https://www.youtube.com/watch?v=KBMVzRuRrhc"
    }, 
    {
        id: 6,
        name: "Nirmala Sitharaman",
        lectureTitle: "Creativity and Youth Power",
        desc: "Nirmala Sitharaman, as India's Finance Minister, spearheaded economic policies aimed at fostering growth and stability. Her tenure saw initiatives to boost infrastructure development, ease of doing business, and financial inclusion.",
        img : "https://i0.wp.com/lawyersgyan.com/wp-content/uploads/2017/09/topimg_30027_nirmala_sitharaman.jpg?fit=900%2C600&ssl=1",
        youtubeLink: "https://www.youtube.com/playlist?list=PLu0W_9lII9ahIappRPN0MCAgtOu3lQjQi"
    },
    {
        id: 7,
        name: "Kiran Bedi",
        lectureTitle: "Transparency in Governance and Administration",
        desc:"Kiran Bedi, India's first female IPS officer, has dedicated her career to law enforcement and social reform. Renowned for her tough stance on crime and corruption, she implemented innovative measures to improve prison conditions and rehabilitation programs.",
        img: "https://english.cdn.zeenews.com/sites/default/files/2023/07/11/1238853-kiran-bedi-ips-officer.jpg",
        youtubeLink: "https://www.youtube.com/watch?v=nMcKbL-01QQ&t=1s"
    }, 
    {
        id: 8,
        name: "Javed Akhtar",
        lectureTitle: "The Storyteller's Odyssey",
        desc:"Javed Akhtar, a prolific Indian poet, lyricist, and scriptwriter, has left an indelible mark on Indian cinema with his lyrics and thought-provoking scripts. His work reflects a deep understanding of human emotions and societal issues, connecting audiences across generations.",
        img : "https://openthemagazine.com/wp-content/uploads/2023/02/JavedAkhtar1.jpg",
        youtubeLink: "https://www.youtube.com/watch?v=wELp2K9SHFg&t=2443s"
    },
    {
        id: 9,
        name: "Indra Nooyi",
        lectureTitle: "My Story",
        desc:"Indra Nooyi, as former CEO of PepsiCo, took transformative initiatives, emphasizing sustainable growth and corporate responsibility. Her strategic vision led to innovative product diversification and global expansion, reshaping PepsiCo's trajectory in the market.",
        img: "https://valiantceo.com/wp-content/uploads/2021/04/Indra-Nooyi.jpg",
        youtubeLink: "https://www.youtube.com/playlist?list=PLu0W_9lII9ahIappRPN0MCAgtOu3lQjQi"
    }, 
    {
        id: 10,
        name: "Viswanath Anand",
        lectureTitle: "The King's Gambit",
        desc:"Vishwanathan Anand, a chess grandmaster, has left an indelible mark on the world of chess through his strategic brilliance and excellence. His innovative style and numerous achievements have cemented his legacy as one of the greatest players in the history of the game.",
        img : "https://static.theprint.in/wp-content/uploads/2021/06/va.jpg",
        youtubeLink: "https://www.youtube.com/watch?v=DnXsY6s31Uc"
    }, 
    {
        id: 11,
        name: "S S Rajamouli",
        lectureTitle: "An Interactive Session",
        desc:"SS Rajamouli is a visionary filmmaker known for his epic storytelling and visual effects, notably seen in the 'Baahubali'. His works transcend boundaries, captivating audiences with their gripping narratives and cinematic brilliance.",
        img : "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202301/ss_rajamouli-sixteen_nine.jpg?VersionId=AewUpU0s5aWkffQ2ISuqzGnOo4L8yCGB&size=690:388",
        youtubeLink: "https://www.youtube.com/watch?v=UazBOUoRKz8"
    },
    {
        id: 12,
        name: "Dr. S. Somanath",
        lectureTitle: "From India to Infinity: ISRO’s Cosmic Voyage",
        desc:"Dr. S Somnath is renowned for his pioneering contributions to India's space program, particularly his leadership in the development of lunar exploration missions, like 'Chandrayaan 2' sets an example for devoloping India's space echnology.",
        img : "https://th-i.thgim.com/public/incoming/txyur6/article66096236.ece/alternates/LANDSCAPE_1200/2501_30_6_2022_19_41_52_1_BEFE2464_8EED_4A12_AF33_01870F33F722.JPEG",
        youtubeLink: "https://www.youtube.com/watch?v=K3M1OtTPSD8"
    },
    {
        id: 13,
        name: "Sri Sri Ravi Shankar",
        lectureTitle: "Wellness and Spirituality in the Post-Pandemic World ",
        desc: "Sri Sri Ravi Shankar is a renowned spiritual leader and humanitarian who has dedicated his life to promoting peace, meditation, and social harmony through his teachings and initiatives. Through his organization, 'The Art of Living', he has offered tools for personal growth",
        img : "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2023/03/sri-sri-ravi-shankar-1677840589.jpg",
        youtubeLink: "https://www.youtube.com/watch?v=kcBUx90gNME"
    },  
    {
        id: 14,
        name: "Shashi Tharoor",
        lectureTitle: "Abhudyay - build burn and fuck of",
        desc: "Shashi Tharoor, a renowned Indian politician and author, has dedicated his career to promoting diplomacy, advocating for social justice through his writings and speeches. His contributions span politics, literature, and international affairs, shaping conversations on democracy.        ",
        img : "https://static.toiimg.com/photo/76180117.cms",
        youtubeLink: "https://www.youtube.com/playlist?list=PLu0W_9lII9ahIappRPN0MCAgtOu3lQjQi"
    }

]

export default SpeakerData;
