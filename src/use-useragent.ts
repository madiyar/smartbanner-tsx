import React from "react";

interface UAProps {
  os: { name: string, version: string },
  browser: { name: string },
}

export function useUserAgent() {
  const [agent, setUserAgent] = React.useState<UAProps | null>(null);

  React.useEffect(() => {
    const loadParser = async () => {
      try {
        const { UAParser } = await import("ua-parser-js");
        const parser = new UAParser();
        setUserAgent(parser.getResult() as UAProps);
      } catch (error) {
        console.error("Failed to load ua-parser-js:", error);
      }
    };
    
    loadParser();
  }, []);

  return agent;
}
