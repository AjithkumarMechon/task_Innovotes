import React, { useState, useEffect } from 'react';

const Planet = () => {
  const [planetData, setPlanetData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets/');
        const data = await response.json();
        setPlanetData(data.results);
        setLoading(false);
        if (!data.results) {
          alert('no search results');
        }
      } catch (error) {
        console.log('Error fetching planet data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredPlanets = planetData.filter(
    (planet) =>
      planet.name.toLowerCase().includes(searchTerm) ||
      planet.population.includes(searchTerm)
  );

  // const handleBack = () => {
  //   window.location.href = '/';
  // };

  return (
    <>
      {/* <button style={{ color: 'blue' }} onClick={handleBack}>
        Back
      </button> */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div style={{ color: 'green' }}>Search for planets</div>
              <div>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <h2>Planet Population</h2>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Population</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPlanets.map((planet) => (
                    <tr key={planet.name}>
                      <td
                        style={{
                          display: 'flex',
                          justifyContent: 'start',
                          alignItems: 'center',
                          marginRight: '10px',
                        }}
                      >
                        {planet.name}
                      </td>
                      <td>
                        <div
                          title={planet.population}
                          className="population-column"
                          style={{
                            display: 'flex',
                            justifyContent: 'start',
                            alignItems: 'center',
                            marginLeft: '10px',
                          }}
                        >
                          {Array.from(
                            { length: planet.population.toString().length },
                            (_, i) => `\u{1F468}`
                          ).join(' ')}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredPlanets.length === 0 && (
                <div className="error">no search results</div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Planet;
