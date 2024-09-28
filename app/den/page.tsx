const DenPage = () => {
  const humans = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 },
  ];

  return (
    <div className="p-4 pt-96">
      <h1 className="text-2xl font-bold mb-4">Human List</h1>
      <ul>
        {humans.map((human, index) => (
          <li key={index} className="mb-2 p-2 border rounded shadow">
            <p>Name: {human.name}</p>
            <p>Age: {human.age}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default DenPage;
