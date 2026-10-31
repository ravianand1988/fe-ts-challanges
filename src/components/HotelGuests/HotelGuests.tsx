import { useId, useState } from "react";
import { Counter } from "../Counter/Counter";

interface Room {
  id: number;
  adults: number;
  children: number[];
}

const createRoom = (id: number): Room => ({
  id,
  adults: 2,
  children: [],
});

export const HotelGuests = () => {
  const [rooms, setRooms] = useState([createRoom(1)]);
  const uniqueId = useId();

  function addRoom() {
    const lastRoomId = Math.max(...rooms.map((r) => r.id));
    setRooms((prev) => [...prev, createRoom(lastRoomId + 1)]);
  }

  function removeRoom(roomId: number) {
    if (rooms.length === 1) {
      return;
    }

    setRooms((prev) => prev.filter((room) => room.id !== roomId));
  }

  function updateAdults(id: number, count: number) {
    setRooms((prev) =>
      prev.map((room) => (room.id === id ? { ...room, adults: count } : room)),
    );
  }

  function addChild(roomId: number) {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === roomId
          ? { ...room, children: [...room.children, 0] }
          : room,
      ),
    );
  }

  function updateChildAge(roomId: number, childIndex: number, age: number) {
    setRooms((prev) => {
      return prev.map((room) =>
        room.id === roomId
          ? {
              ...room,
              children: room.children.map((currentAge, i) =>
                i === childIndex ? age : currentAge,
              ),
            }
          : room,
      );
    });
  }

  const totalGuests = rooms.reduce(
    (total, room) => total + room.adults + room.children.length,
    0,
  );

  return (
    <div>
      <h2>Hotel Guests</h2>
      {rooms.map((room, index) => {
        return (
          <section key={room.id}>
            <h3>Room {index + 1}</h3>
            <label>
              Adults
              <Counter
                key={room.id}
                min={1}
                max={6}
                value={room.adults}
                onChange={(value) => {
                  updateAdults(room.id, value);
                }}
              />
            </label>

            <button onClick={() => addChild(room.id)}>Add child</button>

            {room.children.map((age, childIndex) => (
              <label key={`${uniqueId}${childIndex}`} htmlFor="">
                Child {childIndex + 1} age
                <Counter
                  key={`${uniqueId}${childIndex}`}
                  min={0}
                  max={17}
                  value={age}
                  onChange={(value) => {
                    updateChildAge(room.id, childIndex, value);
                  }}
                />
              </label>
            ))}

            <button onClick={() => removeRoom(room.id)}>Remove room</button>
          </section>
        );
      })}
      <button onClick={addRoom}>Add room</button>

      <p>Total guests: {totalGuests}</p>
    </div>
  );
};
