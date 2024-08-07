import { useState, useEffect } from "react";
import { Cat, Heart, Info, Paw, Star, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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

const Index = () => {
  const [likes, setLikes] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentFact, setCurrentFact] = useState(0);
  const { toast } = useToast();

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

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-purple-100 to-pink-100'} p-8 transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto">
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
          className="relative mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
            alt="A majestic cat"
            className="mx-auto object-cover w-full h-[500px] rounded-lg shadow-2xl"
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="about">About Cats</TabsTrigger>
            <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
            <TabsTrigger value="breeds">Popular Breeds</TabsTrigger>
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
                        <CatCard {...breed} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
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
