import { useState } from "react";
import { Cat, Heart, Info, Paw } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const catBreeds = [
  { name: "Siamese", origin: "Thailand", temperament: "Vocal, Affectionate, Intelligent" },
  { name: "Persian", origin: "Iran", temperament: "Gentle, Quiet, Docile" },
  { name: "Maine Coon", origin: "United States", temperament: "Gentle, Friendly, Intelligent" },
  { name: "British Shorthair", origin: "United Kingdom", temperament: "Calm, Patient, Intelligent" },
  { name: "Scottish Fold", origin: "Scotland", temperament: "Sweet-tempered, Adaptable, Playful" },
];

const CatCard = ({ breed, origin, temperament }) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle>{breed}</CardTitle>
      <CardDescription>Origin: {origin}</CardDescription>
    </CardHeader>
    <CardContent>
      <p><strong>Temperament:</strong> {temperament}</p>
    </CardContent>
  </Card>
);

const Index = () => {
  const [likes, setLikes] = useState(0);
  const { toast } = useToast();

  const handleLike = () => {
    setLikes(likes + 1);
    toast({
      title: "Thanks for the love!",
      description: "You've made a cat purr somewhere in the world.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-5xl font-bold mb-6 flex items-center justify-center text-purple-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Cat className="mr-2 text-pink-500" /> Feline Fascination
        </motion.h1>
        
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
                <p className="text-lg text-gray-700">
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
                {catBreeds.map((breed, index) => (
                  <CatCard key={index} {...breed} />
                ))}
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
          <p className="text-xl text-purple-800 italic">
            "Time spent with cats is never wasted." - Sigmund Freud
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
