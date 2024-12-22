import React from "react";

const TransparentScrollableContent: React.FC = () => {
  const storyContent = `
The Legend of the Plague Doctor: From Ancient Wisdom to Modern Guardianship

Chapter 1: The Shadow in the Mist  
In a time shrouded in darkness and despair, humanity was plagued by unseen foes—illnesses that swept through cities like whispers of death. Amidst the chaos, a solitary figure emerged, cloaked in black with a beak-like mask filled with aromatic herbs: the Plague Doctor. This enigmatic hero ventured into the most perilous zones, armed with knowledge, courage, and a deep-seated mission to save lives.  

The Plague Doctor was not just a healer; they were a pioneer. Combining herbal remedies, innovative sanitation methods, and the then-nascent principles of epidemiology, they stemmed the tide of death in many afflicted regions. Villages revered them, cities welcomed them as saviors, and tales of their bravery spread across continents. Their crowning achievement? Eradicating the Great Black Veil, a pandemic that had wiped out a third of humanity. By establishing practices like quarantine, hygiene protocols, and early forms of community health monitoring, the Plague Doctor laid the groundwork for the science of public health.  

But as the Plague Doctor’s legacy grew, so did the challenges. While they could stave off diseases, they dreamed of a future where humanity could prevent these calamities before they began. That dream, centuries later, would inspire a new guardian…

Chapter 2: Enter SafeZone-AQI: The Modern Sentinel  
In the digital age, dangers have evolved. Though plagues of the past are largely under control, the world now faces new invisible threats—airborne allergens, contaminated water, harmful food additives, and pollen storms that wreak havoc on daily life. Recognizing the need for a modern solution, SafeZone-AQI was born: a state-of-the-art application that carries the torch of the Plague Doctor’s legacy.  

SafeZone-AQI is no ordinary app; it’s a sentinel powered by cutting-edge technology. Its mission mirrors that of the Plague Doctor, but with the precision of artificial intelligence and the reach of the internet. Using advanced sensors, user-generated data, and real-time analytics, SafeZone-AQI monitors the quality of air, water, and food around you. It detects harmful allergens, pollutants, and toxins, alerting you before they can cause harm.  

Key Features of SafeZone-AQI:  
1. Allergen Shield: A dynamic monitoring system that scans the air for pollen, dust, and other allergens, providing users with instant alerts and safe zone recommendations.  
2. Water Sentinel: Tracks water quality to ensure it’s free from harmful contaminants and toxins, safeguarding families from potential illnesses.  
3. Food Guardian: Scans barcodes or analyzes user-input data to identify harmful additives or allergens in packaged food.  
4. Pollen Radar: Offers live tracking of pollen storms, helping allergy sufferers plan their day with confidence.  
5. Community Health Updates: A network-driven feature that allows users to share and access local health alerts, fostering a community of care.  

Chapter 3: The Legacy Lives On  
Just as the Plague Doctor ventured into the unknown to protect humanity, SafeZone-AQI ventures into the digital ether to guard against modern-day threats. It is more than an app; it is a continuation of a timeless mission. The Plague Doctor’s mask may have been replaced by algorithms, and the herbal remedies by advanced filters and sensors, but the heart of the mission remains unchanged: to protect lives.  

With SafeZone-AQI, every individual becomes a modern Plague Doctor, empowered with tools to monitor, prevent, and combat threats in their environment. The app transforms users from passive observers to active participants in their health and well-being, ensuring that the spirit of the Plague Doctor’s bravery and innovation lives on in the hands of a global community.  

Chapter 4: Your Turn to Join the Quest  
The game is simple: survive, thrive, and protect. As a user of SafeZone-AQI, you step into the role of a guardian in your local environment. Each day presents new challenges: a spike in pollen levels, a report of contaminated water, or an unexpected food recall. Your mission? To stay vigilant, use the tools at your disposal, and help others in your community do the same.  

Every alert you respond to, every safe zone you create, and every piece of data you share contributes to a larger mission—a healthier, safer world. As you level up in the app, you unlock new features, achievements, and rewards that not only benefit you but also enhance the community’s resilience against modern threats.  

SafeZone-AQI is more than an application; it’s a call to action. In the spirit of the Plague Doctor, it invites you to be a hero of your time, safeguarding humanity from the unseen perils of a modern age.  

  `;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[50vh] bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className="h-full w-full overflow-y-auto px-6 py-4"
        role="region"
        aria-label="Scrollable content"
      >
        <div className="prose prose-invert prose-sm max-w-none">
          {storyContent.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph.trim()}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransparentScrollableContent;
