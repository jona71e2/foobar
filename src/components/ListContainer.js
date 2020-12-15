import React, { useState } from "react";
import TapLevel from "./TapLevel";
import StorageAmount from "./StorageAmount";

export default function ListContainer({ storage, taps }) {
  //console.log(storage, taps);
  // HOOKS
  const [filter, setFilter] = useState("all");
  const [sortKey, setSortKey] = useState("length");
  const [sortDirection, setSortDirection] = useState("desc");

  //Object prototype
  const FullDataObject = {
    name: "",
    amount: null,
    taps: [],
  };

  // Array til data
  let fullDataArray = [];

  //Tilpasning af data til object prototype.
  function prepareObjects(storage) {
    fullDataArray = storage.map(prepareObject);
  }

  function prepareObject(data) {
    const fullData = Object.create(FullDataObject);

    fullData.name = data.name;
    fullData.amount = data.amount;

    //Looper over taps. For hver tap findes den pågældende øl fra storage og indsættes
    taps.map((tap) => {
      if (tap.beer === fullData.name) {
        fullData.taps = [...fullData.taps, { ...tap }];
      }
      return tap;
    });

    return fullData;
  }

  prepareObjects(storage);

  let filteredList = fullDataArray;

  //Tilpasser filteredList til staten af filter
  if (filter !== "all") {
    filteredList = filteredList.filter((beer) =>
      filter ? beer.taps.length > 0 : beer.taps.length === 0
    );
  }

  //Tilpasser filteredList til staten af sortKey
  filteredList = filteredList.sort((a, b) => {
    //Tjekker først om der sorteres efter array-længden på taps.
    if (sortKey === "length") {
      if (a.taps[sortKey] > b.taps[sortKey]) {
        return sortDirection === "asc" ? 1 : -1;
      } else {
        return sortDirection === "asc" ? -1 : 1;
      }
    } else {
      if (a[sortKey] > b[sortKey]) {
        return sortDirection === "asc" ? 1 : -1;
      } else {
        return sortDirection === "asc" ? -1 : 1;
      }
    }
  });

  return (
    <>
      <nav>
        <button
          className={filter === true ? "button-active" : "button-default"}
          onClick={() => setFilter(filter === true ? "all" : true)}
        >
          Aktive
        </button>
        <button
          className={filter === false ? "button-active" : "button-default"}
          onClick={() => setFilter(filter === false ? "all" : false)}
        >
          Passive
        </button>
        <select
          sorting={filteredList}
          onChange={(evt) => {
            //Variabel, der bruges til at sætte sortKey og sortDirection
            const userInput = evt.target.value.split(" ");
            //outputtet efter .split(" "):
            // et array hvor index 0 = sortKey og index 1 = sortDirection
            setSortKey(userInput[0]);
            setSortDirection(userInput[1]);
          }}
        >
          <option>Sorter:</option>
          <option value="name asc">Navn (a-z)</option>
          <option value="name desc">Navn (z-a)</option>
          <option value="amount asc">Lager (lav-høj)</option>
          <option value="amount desc">Lager (høj-lav)</option>
          <option value="length asc">Aktive taps (lav-høj)</option>
          <option value="length desc">Aktive taps (høj-lav)</option>
        </select>
      </nav>
      <ul>
        {filteredList.map((beer) => {
          return (
            <li key={beer.name}>
              <h2 className="list-item-header">{beer.name}</h2>
              <div className="progress-container">
                {beer.taps.length > 0 ? (
                  <TapLevel taps={beer.taps} />
                ) : (
                  <h3>Ikke på tap</h3>
                )}
              </div>
              <StorageAmount className="storage-amount" amount={beer.amount} />
            </li>
          );
        })}
      </ul>
    </>
  );
}