import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import {PullDownContent, ReleaseContent, RefreshContent} from "react-js-pull-to-refresh";
import "../App.css";
import { PullToRefresh } from 'react-js-pull-to-refresh';

const initialChannels = [
  {
    category: "Mobile apps",
    items: [
      { id: "mobile-apps", name: "mobile-apps", memberCount: 120 },
      { id: "react-native", name: "react native", memberCount: 85 },
      { id: "flutter", name: "flutter", memberCount: 95 }
    ]
  },
  {
    category: "Desktop apps",
    items: [
      { id: "desktop-apps", name: "desktop-apps", memberCount: 75 },
      { id: "electron", name: "electron", memberCount: 60 },
      { id: "nwjs", name: "nwjs", memberCount: 40 }
    ]
  },
  {
    category: "3D and graphics",
    items: [
      { id: "threejs", name: "threejs", memberCount: 110 },
      { id: "webgl", name: "webgl", memberCount: 80 },
      { id: "d3js", name: "d3js", memberCount: 70 }
    ]
  },
  {
    category: "Tools",
    items: [
      { id: "graphql", name: "graphql", memberCount: 130 },
      { id: "typescript", name: "typescript", memberCount: 150 },
      { id: "bundlers", name: "bundlers", memberCount: 65 },
      { id: "editors", name: "editors", memberCount: 55 }
    ]
  },
];

function Home() {
  const [channels, setChannels] = useState(initialChannels);
  const [expanded, setExpanded] = useState({
    "Mobile apps": true,
    "Desktop apps": true,
    "3D and graphics": true,
    "Tools": true
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const handleRefresh = async () => {
    // console.log('Refresh triggered');
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(() => {
        // console.log('Updating data');
        const updatedChannels = channels.map(group => ({
          ...group,
          items: group.items.map(item => ({
            ...item,
            memberCount: item.memberCount + 1
          }))
        }));
        setChannels(updatedChannels);
        resolve();
      }, 1000);
    });
    setLoading(false);
  };
  
  const toggleCategory = (category) => {
    setExpanded((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <PullToRefresh
      pullDownContent={<PullDownContent />}
      releaseContent={<ReleaseContent />}
      refreshContent={<RefreshContent />}
      pullDownThreshold={200}
      onRefresh={handleRefresh}
      triggerHeight={50}
      backgroundColor='white'
      startInvisible={true}
    >
      <div id="sidebar" className="sm:w-full bg-white text-black min-h-screen overflow-auto py-2">
        <div className="flex-1 px-4">
          {channels.map((channelGroup, index) => (
            <div key={index} className="mb-4">
              <div
                className="flex justify-between items-center cursor-pointer p-2 rounded transition duration-200 ease-in-out"
                onClick={() => toggleCategory(channelGroup.category)}
              >
                <span className="text-sm font-bold">{channelGroup.category}</span>
                {expanded[channelGroup.category] ? (
                  <FaChevronUp className="text-gray-700" />
                ) : (
                  <FaChevronDown className="text-gray-700" />
                )}
              </div>
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expanded[channelGroup.category] ? 'max-h-[1000px]' : 'max-h-0'}`}>
                <div className="mt-2">
                  {channelGroup.items.map((channel, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded cursor-pointer transition duration-200 ease-in-out"
                    >
                      <div className="flex justify-between items-center">
                        <span>#{channel.name}</span>
                        <span className="text-sm text-gray-600">{channel.memberCount} members</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PullToRefresh>
  );
}

export default Home;
