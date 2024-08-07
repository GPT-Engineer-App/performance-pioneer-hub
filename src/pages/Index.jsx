import { useState, useEffect } from "react";
import { Cat, Heart, Info, Paw, Star, Moon, Sun, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const catBreeds = [
  { name: "Siamese", origin: "Thailand", temperament: "Vocal, Affectionate, Intelligent", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
  { name: "Persian", origin: "Iran", temperament: "Gentle, Quiet, Docile", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
  { name: "Maine Coon", origin: "United States", temperament: "Gentle, Friendly, Intelligent", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
  { name: "British Shorthair", origin: "United Kingdom", temperament: "Calm, Patient, Intelligent", image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Britishblue.jpg" },
  { name: "Scottish Fold", origin: "Scotland", temperament: "Sweet-tempered, Adaptable, Playful", image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Adult_Scottish_Fold.jpg" },
];

const CatCard = ({ breed, origin, temperament, image }) => (
  <Card className="mb-4 overflow-hidden">
    <img src={image} alt={breed} className="w-full h-48 object-cover" />
    <CardHeader>
      <CardTitle>{breed}</CardTitle>
      <CardDescription>Origin: {origin}</CardDescription>
    </CardHeader>
    <CardContent>
      <p><strong>Temperament:</strong> {temperament}</p>
    </CardContent>
  </Card>
);

const CatFact = ({ fact }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-purple-100 p-4 rounded-lg shadow-md mb-4"
  >
    <p className="text-purple-800 font-semibold">{fact}</p>
  </motion.div>
);

const quizQuestions = [
  {
    question: "What is a group of cats called?",
    options: ["A pride", "A clowder", "A pack", "A colony"],
    correctAnswer: "A clowder"
  },
  {
    question: "How many vocalizations can a cat make?",
    options: ["Over 10", "Over 20", "Over 30", "Over 40"],
    correctAnswer: "Over 20"
  },
  {
    question: "Which cat breed is known for its folded ears?",
    options: ["Persian", "Siamese", "Scottish Fold", "Maine Coon"],
    correctAnswer: "Scottish Fold"
  }
];

const Index = () => {
  const [likes, setLikes] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentFact, setCurrentFact] = useState(0);
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const { scrollYProgress } = useScroll();
  const { toast } = useToast();

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  const catFacts = [
    "Cats sleep for about 70% of their lives.",
    "A group of cats is called a clowder.",
    "Cats have over 20 vocalizations, including the purr, meow, and chirp.",
    "The first cat in space was a French cat named Felicette in 1963.",
    "Cats can jump up to six times their length.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % catFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLike = () => {
    setLikes(likes + 1);
    toast({
      title: "Thanks for the love!",
      description: "You've made a cat purr somewhere in the world.",
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleQuizAnswer = () => {
    if (selectedAnswer === quizQuestions[quizStep].correctAnswer) {
      setQuizScore(quizScore + 1);
    }
    setQuizStep(quizStep + 1);
    setSelectedAnswer("");
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizScore(0);
    setSelectedAnswer("");
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-purple-100 to-pink-100'} transition-colors duration-300`}>
      <motion.div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          y: backgroundY,
          opacity
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <motion.h1 
            className="text-5xl font-bold flex items-center justify-center text-purple-800 dark:text-purple-300"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Cat className="mr-2 text-pink-500" /> Feline Fascination
          </motion.h1>
          <Button onClick={toggleDarkMode} variant="outline" size="icon">
            {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        </div>
        
        <motion.div 
          className="relative mb-8 overflow-hidden rounded-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
            alt="A majestic cat"
            className="mx-auto object-cover w-full h-[500px]"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.5 }}
          />
          <Button 
            className="absolute bottom-4 right-4 bg-pink-500 hover:bg-pink-600"
            onClick={handleLike}
          >
            <Heart className="mr-2 h-4 w-4" /> Like ({likes})
          </Button>
        </motion.div>

        <AnimatePresence mode="wait">
          <CatFact key={currentFact} fact={catFacts[currentFact]} />
        </AnimatePresence>

        <Tabs defaultValue="about" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="about">About Cats</TabsTrigger>
            <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
            <TabsTrigger value="breeds">Popular Breeds</TabsTrigger>
            <TabsTrigger value="quiz">Cat Quiz</TabsTrigger>
          </TabsList>
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About Cats</CardTitle>
                <CardDescription>Fascinating feline facts</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Cats have been cherished companions for thousands of years. These graceful creatures are known for their independence, agility, and affectionate nature. From ancient Egyptian deities to modern-day internet sensations, cats continue to captivate our hearts and minds.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="characteristics">
            <Card>
              <CardHeader>
                <CardTitle>Cat Characteristics</CardTitle>
                <CardDescription>What makes cats unique</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-none space-y-2">
                  <li className="flex items-center"><Paw className="mr-2 text-pink-500" /> Excellent hunters with sharp claws and teeth</li>
                  <li className="flex items-center"><Paw className="mr-2 text-pink-500" /> Flexible bodies and quick reflexes</li>
                  <li className="flex items-center"><Paw className="mr-2 text-pink-500" /> Keen senses, especially hearing and night vision</li>
                  <li className="flex items-center"><Paw className="mr-2 text-pink-500" /> Communicate through vocalizations, body language, and scent</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            <Card>
              <CardHeader>
                <CardTitle>Popular Cat Breeds</CardTitle>
                <CardDescription>Discover diverse feline friends</CardDescription>
              </CardHeader>
              <CardContent>
                <Carousel className="w-full max-w-xs mx-auto">
                  <CarouselContent>
                    {catBreeds.map((breed, index) => (
                      <CarouselItem key={index}>
                        <motion.div
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <CatCard {...breed} />
                        </motion.div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="quiz">
            <Card>
              <CardHeader>
                <CardTitle>Cat Quiz</CardTitle>
                <CardDescription>Test your feline knowledge</CardDescription>
              </CardHeader>
              <CardContent>
                {quizStep < quizQuestions.length ? (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">{quizQuestions[quizStep].question}</h3>
                    <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                      {quizQuestions[quizStep].options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem value={option} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                    <Button 
                      onClick={handleQuizAnswer} 
                      disabled={!selectedAnswer}
                      className="mt-4"
                    >
                      Next <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">Quiz Complete!</h3>
                    <p className="text-lg mb-4">Your score: {quizScore} out of {quizQuestions.length}</p>
                    <Button onClick={resetQuiz}>Try Again</Button>
                  </div>
                )}
                <Progress value={(quizStep / quizQuestions.length) * 100} className="mt-4" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-xl text-purple-800 dark:text-purple-300 italic">
            "Time spent with cats is never wasted." - Sigmund Freud
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
