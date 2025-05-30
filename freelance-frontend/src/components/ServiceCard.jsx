import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  return (
    <Link to={`/service/${service?.id}`} className="block">
      <div className="border rounded p-4 shadow hover:shadow-lg transition">
        <h3 className="text-lg font-semibold">{service?.title}</h3>
        <p className="text-sm text-gray-600">{service?.description}</p>
        <div className="flex justify-between mt-2">
          <span className="text-purple-800 font-semibold">${service?.price}</span>
          <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
            {service?.category.name}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
