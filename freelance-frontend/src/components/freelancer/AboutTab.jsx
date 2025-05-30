import React from "react";

const AboutTab = ({ person }) => {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Acerca de mí</h2>
        <div className="text-gray-700 whitespace-pre-line">
          {person.description}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Experiencia</h2>
        {person.experience.map((exp, index) => (
          <div key={index} className="mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{exp.position}</h3>
                <p className="text-gray-600">{exp.company}</p>
              </div>
              <span className="text-gray-500 text-sm">{exp.period}</span>
            </div>
            <p className="text-gray-700 mt-2">{exp.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AboutTab;
