const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// Verileri JSON olarak alabilmek için middleware
app.use(cors());
app.use(express.json());

// Test soruları ve karakterler
const questions = [
    {
        question: "En sevdiğin renk?",
        options: {
            "Mavi": "Rainbow Dash",
            "Mor": "Twilight Sparkle",
            "Sarı": "Fluttershy",
            "Pembe": "Pinkie Pie",
            "Beyaz": "Rarity",
            "Turuncu": "Applejack"
        }
    },
    {
        question: "Hafta sonlarını nasıl geçirirsin?",
        options: {
            "Macera dolu aktiviteler!": "Rainbow Dash",
            "Kitap okumak ve öğrenmek": "Twilight Sparkle",
            "Hayvanlarla vakit geçirmek": "Fluttershy",
            "Parti ve eğlence!": "Pinkie Pie",
            "Moda ve tasarım": "Rarity",
            "Çiftlik işleri ve doğa": "Applejack"
        }
    },
    {
        question: "En sevdiğin özellik?",
        options: {
            "Cesaret ve hız": "Rainbow Dash",
            "Bilgelik ve liderlik": "Twilight Sparkle",
            "Şefkat ve merhamet": "Fluttershy",
            "Neşe ve eğlence": "Pinkie Pie",
            "Zarafet ve stil": "Rarity",
            "Çalışkanlık ve sadakat": "Applejack"
        }
    }
];

// Kullanıcının verdiği cevaplara göre karakter belirleyen fonksiyon
app.post("/test", (req, res) => {
    const answers = req.body.answers;

    // Puan tablosu
    let scores = {
        "Rainbow Dash": 0,
        "Twilight Sparkle": 0,
        "Fluttershy": 0,
        "Pinkie Pie": 0,
        "Rarity": 0,
        "Applejack": 0
    };

    // Kullanıcının verdiği her cevap için karakter puanlarını artır
    answers.forEach((answer, index) => {
        const selectedCharacter = questions[index].options[answer];
        if (selectedCharacter) {
            scores[selectedCharacter]++;
        }
    });

    // En yüksek puana sahip karakteri belirle
    const resultCharacter = Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b));

    res.json({ character: resultCharacter });
});

// Test sorularını döndüren endpoint
app.get("/questions", (req, res) => {
    res.json(questions);
});

// Sunucuyu başlat
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
