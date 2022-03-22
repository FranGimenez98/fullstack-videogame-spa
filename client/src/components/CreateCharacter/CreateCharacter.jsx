import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getPlatforms, postVidegame } from "../../actions";
import styles from "./CreateCharacter.module.css";
import { ImCross } from "react-icons/im";


const CreateCharacter = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);

  const [input, setInput] = useState({
    name: "",
    description: "",
    release: "",
    rating: "",
    platforms: [],
    genres: [],
    image: "",
  });

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  const handleOnChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectPLatforms = (e) => {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value],
    });
  };

  const handleSelectGenres = (e) => {
    e.preventDefault(e);
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postVidegame(input));
    alert("VG Creado");
    setInput({
      name: "",
      description: "",
      release: "",
      rating: "",
      platforms: [],
      genres: [],
      image: "",
    });
  };

  const handleDelete = (e) => {
    setInput({
      ...input,
      genres: input.genres.filter((g) => g !== e),
      platforms: input.platforms.filter((p) => p !== e),
    });
  };

  let id = 0
  function key(){
    return id++
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <div className={styles.titleContainer}>
            <h2>
              <span className={styles.titleSpan}>Create your</span>
            </h2>
            <h1>
              <span className={styles.vgSpan}>Videogame</span>
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.form}>
              <input
                placeholder="Name"
                className={styles.inputs}
                type="text"
                value={input.name}
                name="name"
                onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div className={styles.form}>
              <input
                placeholder="Description"
                className={styles.inputs}
                type="text"
                value={input.description}
                name="description"
                onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div className={styles.form}>
              <input
                placeholder="Release"
                className={styles.inputs}
                type="text"
                value={input.release}
                name="release"
                onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div className={styles.form}>
              <input
                placeholder="Rating"
                className={styles.inputs}
                type="number"
                value={input.rating}
                name="rating"
                max="5"
                min="0"
                onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div className={styles.form}>
              <input
                placeholder="Image URL"
                className={styles.inputs}
                type="text"
                value={input.image}
                name="image"
                onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div className={styles.selectContainer}>
              <select className={styles.select} onChange={handleSelectGenres}>
                {genres?.map((g) => (
                  <option value={g.name} key={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>

              <select
                className={styles.select}
                onChange={handleSelectPLatforms}
              >
                {platforms?.map((p) => (
                  <option className={styles.option} value={p.name} key={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.results}>
              <div className={styles.resultsContainer}>
                <ul>
                  <li>
                    {input.genres.map((el) => {
                      return (
                        <div key={key()}>
                          <div className={styles.box}>
                            {el}
                            <div className={styles.delete} onClick={() => handleDelete(el)} value={el}>
                              <ImCross className={styles.cross}  />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </li>
                </ul>
              </div>
              <ul>
                <li>
                  {input.platforms.map((p) => {
                    return (
                      <div key={key()}>
                        <div className={styles.box}>
                          {p}
                          <div className={styles.delete} onClick={() => handleDelete(p)}>
                            <ImCross className={styles.cross} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </li>
              </ul>
            </div>
            <div className={styles.deleteBtnContainer}>
              <button className={styles.deleteBtn} type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCharacter;
