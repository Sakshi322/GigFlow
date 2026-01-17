// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { createGig } from "../redux/slices/gigsSlice";
// import { useNavigate } from "react-router-dom";

// const CreateGig = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     dispatch(
//       createGig({
//         title,
//         description,
//         price,
//       })
//     ).then(() => {
//       navigate("/dashboard");
//     });
//   };

//   return (
//     <div>
//       <h1>Create Gig</h1>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Gig Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />

//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />

//         <input
//           type="number"
//           placeholder="Price"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           required
//         />

//         <button type="submit">Create</button>
//       </form>
//     </div>
//   );
// };

// export default CreateGig;


import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGig } from "../redux/slices/gigsSlice";
import { useNavigate } from "react-router-dom";

const CreateGig = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createGig({ title, description, budget }))
      .unwrap()
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Create Gig</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Gig Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border p-2 w-full"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border p-2 w-full"
        />

        <input
          type="number"
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateGig;

