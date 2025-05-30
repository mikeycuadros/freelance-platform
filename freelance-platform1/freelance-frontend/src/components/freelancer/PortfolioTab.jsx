import React from "react";

const PortfolioTab = ({ person }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Portafolio</h2>
      {person.portfolios && person.portfolios.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {person.portfolios.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:shadow-md transition"
            >
              <div className="h-40 bg-gray-200 rounded-md mb-3"></div>
              <h3 className="font-medium mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              {item.url && (
                <a
                  href={item.url}
                  className="text-purple-800 hover:underline text-sm font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver proyecto →
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          Este freelancer aún no ha añadido proyectos a su portafolio.
        </p>
      )}
    </div>
  );
};

export default PortfolioTab;
