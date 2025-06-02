import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis,
  ComposedChart,
} from "recharts";

const COLORS = [
  "#6366f1", // Indigo
  "#8b5cf6", // Violet
  "#ec4899", // Pink
  "#f43f5e", // Rose
  "#f97316", // Orange
  "#eab308", // Yellow
  "#22c55e", // Green
];

const StatsTab = ({ stats }) => {
  // Calcular totales y promedios basados en los datos reales
  const totalMessages =
    stats.topMessageReceivers?.reduce(
      (sum, user) => sum + user.messageCount,
      0
    ) || 0;

  const totalReviews =
    stats.topReviewReceivers?.reduce(
      (sum, user) => sum + user.reviewCount,
      0
    ) || 0;

  const averageRating =
    stats.topRatedFreelancers?.reduce(
      (sum, user) => sum + (parseFloat(user.averageRating) || 0),
      0
    ) / (stats.topRatedFreelancers?.length || 1) || 0;

  // Asegurarnos de que el promedio esté entre 0 y 5
  const normalizedAverageRating = Math.min(Math.max(averageRating, 0), 5);

  return (
    <div className="space-y-6">
      {/* Resumen de métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-full">
              <svg
                className="h-8 w-8 text-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Mensajes Totales
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-indigo-800">
                  {totalMessages}
                </div>
              </dd>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Distribuidos entre {stats.topMessageReceivers?.length || 0} usuarios
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0 bg-rose-100 p-3 rounded-full">
              <svg
                className="h-8 w-8 text-rose-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M17 16l4 4m-4-4l-4 4m4-4L17 4l-4 4m-4 4h.01M7 12h3m-3 4h3"
                />
              </svg>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Reseñas Totales
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-rose-800">
                  {totalReviews}
                </div>
              </dd>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Distribuidas entre {stats.topReviewReceivers?.length || 0} usuarios
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0 bg-yellow-100 p-3 rounded-full">
              <svg
                className="h-8 w-8 text-yellow-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.54 1.118l-4.915-3.57a1 1 0 00-1.176 0l-4.915 3.57c-.785.57-1.838-.196-1.54-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Calificación Promedio
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-yellow-800">
                  {normalizedAverageRating.toFixed(1)}
                </div>
              </dd>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Basado en {stats.topRatedFreelancers?.length || 0} usuarios
          </p>
        </div>
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gráfico de usuarios con más mensajes */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-indigo-500 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
            Usuarios con más mensajes
          </h3>
          {!stats.topMessageReceivers?.length ? (
            <p className="text-gray-500">No hay datos disponibles</p>
          ) : (
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats.topMessageReceivers}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />
                  <YAxis
                    dataKey="username"
                    type="category"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    width={80}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      backgroundColor: "white",
                      padding: "12px",
                    }}
                    cursor={{ fill: "rgba(99, 102, 241, 0.1)" }}
                    formatter={(value) => [`${value} mensajes`, "Total"]}
                  />
                  <Legend wrapperStyle={{ paddingTop: "20px" }} />
                  <Bar
                    dataKey="messageCount"
                    name="Mensajes recibidos"
                    fill="#6366f1"
                    radius={[0, 8, 8, 0]}
                    barSize={30}
                    animationDuration={2000}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Gráfico de usuarios con más reseñas */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-rose-500 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
            Usuarios con más reseñas
          </h3>
          {!stats.topReviewReceivers?.length ? (
            <p className="text-gray-500">No hay datos disponibles</p>
          ) : (
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={stats.topReviewReceivers}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <defs>
                    <linearGradient
                      id="colorReviews"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#f43f5e"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="username"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickLine={false}
                    axisLine={{ stroke: "#e5e7eb" }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={{ stroke: "#e5e7eb" }}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      backgroundColor: "white",
                      padding: "12px",
                    }}
                    cursor={{ fill: "rgba(244, 63, 94, 0.1)" }}
                    formatter={(value) => [`${value} reseñas`, "Total"]}
                  />
                  <Legend wrapperStyle={{ paddingTop: "20px" }} />
                  <Area
                    type="monotone"
                    dataKey="reviewCount"
                    name="Reseñas recibidas"
                    stroke="#f43f5e"
                    fillOpacity={1}
                    fill="url(#colorReviews)"
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>


      {/* Lista de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Usuarios con más mensajes */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-purple-500 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
            Top usuarios por mensajes
          </h3>
          {!stats.topMessageReceivers?.length ? (
            <p className="text-gray-500">No hay datos disponibles</p>
          ) : (
            <ul className="space-y-2">
              {stats.topMessageReceivers.map((user, index) => (
                <li
                  key={user.id}
                  className="flex justify-between items-center p-2 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  <div className="flex items-center">
                    <span className="w-6 h-6 flex items-center justify-center bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mr-3">
                      {index + 1}
                    </span>
                    <span className="font-medium">{user.username}</span>
                  </div>
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                    {user.messageCount} mensajes
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Usuarios con más reseñas */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-rose-500 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
            Top usuarios por reseñas
          </h3>
          {!stats.topReviewReceivers?.length ? (
            <p className="text-gray-500">No hay datos disponibles</p>
          ) : (
            <ul className="space-y-2">
              {stats.topReviewReceivers.map((user, index) => (
                <li
                  key={user.id}
                  className="flex justify-between items-center p-2 rounded-lg hover:bg-rose-50 transition-colors"
                >
                  <div className="flex items-center">
                    <span className="w-6 h-6 flex items-center justify-center bg-rose-100 text-rose-800 rounded-full text-sm font-medium mr-3">
                      {index + 1}
                    </span>
                    <span className="font-medium">{user.username}</span>
                  </div>
                  <span className="bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-sm font-medium">
                    {user.reviewCount} reseñas
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Usuarios con mejor rating */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-500 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Top usuarios por rating
          </h3>
          {!stats.topRatedFreelancers?.length ? (
            <p className="text-gray-500">No hay datos disponibles</p>
          ) : (
            <ul className="space-y-2">
              {stats.topRatedFreelancers.map((user, index) => (
                <li
                  key={user.id}
                  className="flex justify-between items-center p-2 rounded-lg hover:bg-yellow-50 transition-colors"
                >
                  <div className="flex items-center">
                    <span className="w-6 h-6 flex items-center justify-center bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mr-3">
                      {index + 1}
                    </span>
                    <span className="font-medium">{user.username}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      {parseFloat(user.averageRating).toFixed(1)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsTab;
