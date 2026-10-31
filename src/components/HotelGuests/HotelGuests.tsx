import { useId, useState } from "react";
import { Counter } from "../Counter/Counter";
import styles from "./HotelGuests.module.css";

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
    <div className={styles.container}>
      <h2 className={styles.title}>Hotel Guests</h2>
      <div className={styles.rooms}>
        {rooms.map((room, index) => {
          return (
            <section key={room.id} className={styles.room}>
              <header className={styles.roomHeader}>
                <h3 className={styles.roomTitle}>Room {index + 1}</h3>
                <button
                  type="button"
                  className={styles.buttonDanger}
                  disabled={rooms.length === 1}
                  onClick={() => removeRoom(room.id)}
                >
                  Remove room
                </button>
              </header>

              <div className={styles.field}>
                <span className={styles.fieldLabel}>Adults</span>
                <Counter
                  key={room.id}
                  min={1}
                  max={6}
                  value={room.adults}
                  onChange={(value) => {
                    updateAdults(room.id, value);
                  }}
                />
              </div>

              {room.children.length > 0 && (
                <div className={styles.children}>
                  {room.children.map((age, childIndex) => (
                    <div
                      key={`${uniqueId}${childIndex}`}
                      className={styles.field}
                    >
                      <span className={styles.fieldLabel}>
                        Child {childIndex + 1} age
                      </span>
                      <Counter
                        key={`${uniqueId}${childIndex}`}
                        min={0}
                        max={17}
                        value={age}
                        onChange={(value) => {
                          updateChildAge(room.id, childIndex, value);
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                className={`${styles.button} ${styles.buttonSecondary}`}
                onClick={() => addChild(room.id)}
              >
                + Add child
              </button>
            </section>
          );
        })}
      </div>

      <footer className={styles.footer}>
        <p className={styles.total}>Total guests: {totalGuests}</p>
        <button type="button" className={styles.button} onClick={addRoom}>
          + Add room
        </button>
      </footer>
    </div>
  );
};
