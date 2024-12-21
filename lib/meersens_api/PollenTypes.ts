export type PollenQualityResponse = {
  found: boolean;
  datetime: string; // ISO date string
  index: {
    index_type: string;
    index_name: string;
    qualification: string;
    icon: string | null;
    color: string;
    value: number;
    main_pollutants: string[];
  };
  pollutants: Record<string, PollenData>;
  health_recommendations: {
    all: string;
    family: string;
    sport: string;
    pregnancy: string;
    respiratory: string;
    elderly: string;
    cardiovascular: string;
  };
};

type PollenData = {
  shortcode: string;
  name: string;
  unit: string;
  found: boolean;
  value: number;
  confidence: number;
  index: {
    index_type: string;
    index_name: string;
    qualification: string;
    icon: string | null;
    color: string;
    description: string;
    value: number;
  };
};
