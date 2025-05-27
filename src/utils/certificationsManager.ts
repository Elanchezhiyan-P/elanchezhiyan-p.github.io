
export interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  image: string;
  skills: string[];
}

// Simulated data storage (in a real app, this would be API calls)
let certificationsData: Certification[] = [
  {
    id: 1,
    title: "Microsoft Azure Fundamentals",
    issuer: "Microsoft",
    date: "2023-06-15",
    credentialId: "AZ-900-2023-001",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    skills: ["Azure", "Cloud Computing", "Infrastructure"]
  },
  {
    id: 2,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023-03-20",
    credentialId: "SAA-C02-2023-002",
    image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2",
    skills: ["AWS", "Solutions Architecture", "Cloud Design"]
  }
];

export const getCertificationById = (id: number): Certification | undefined => {
  return certificationsData.find(certification => certification.id === id);
};

export const getAllCertifications = (): Certification[] => {
  return certificationsData;
};

export const addCertification = (certification: Omit<Certification, 'id'>): Certification => {
  const newId = Math.max(...certificationsData.map(c => c.id)) + 1;
  const newCertification = { 
    ...certification, 
    id: newId
  };
  certificationsData.push(newCertification);
  console.log('Certification added:', newCertification);
  return newCertification;
};

export const updateCertification = (id: number, updatedCertification: Omit<Certification, 'id'>): Certification | undefined => {
  const index = certificationsData.findIndex(certification => certification.id === id);
  if (index !== -1) {
    certificationsData[index] = { 
      ...updatedCertification, 
      id
    };
    console.log('Certification updated:', certificationsData[index]);
    return certificationsData[index];
  }
  return undefined;
};

export const deleteCertification = (id: number): boolean => {
  const index = certificationsData.findIndex(certification => certification.id === id);
  if (index !== -1) {
    certificationsData.splice(index, 1);
    console.log('Certification deleted with id:', id);
    return true;
  }
  return false;
};
