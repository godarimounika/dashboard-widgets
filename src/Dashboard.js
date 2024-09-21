
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import SearchIcon from '@mui/icons-material/Search';
// import CachedIcon from '@mui/icons-material/Cached';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import WatchLaterIcon from '@mui/icons-material/WatchLater';
// // import "./Dashboard.css"
// import "./index.css"

// const Dashboard = () => {
//   // const categories = useSelector(state => state.dashboard.categories);

//   const categories = useSelector(state => {
//     console.log(state); // Inspect the state structure here
//     return state.widgets.categories;
//   });
//   const dispatch = useDispatch();
//   const [isPopUpOpen, setIsPopUpOpen] = useState(false);
//   const [newWidgetName, setNewWidgetName] = useState('');
//   const [newWidgetText, setNewWidgetText] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   if (!categories) {
//     return <div>Loading...</div>;
//   }


//   const togglePopUp = (categoryName) => {
//     setSelectedCategory(categoryName);
//     setIsPopUpOpen(!isPopUpOpen);
//   };

//   const handleAddWidget = () => {
//     const newWidget = {
//       id: Date.now(),
//       name: newWidgetName,
//       text: newWidgetText
//     };

//     dispatch({
//       type: 'ADD_WIDGET',
//       payload: {
//         categoryName: selectedCategory,
//         widget: newWidget
//       }
//     });

//     setNewWidgetName('');
//     setNewWidgetText('');
//     togglePopUp('');
//   };

//   const handleRemoveWidget = (categoryName, widgetId) => {
//     dispatch({
//       type: 'REMOVE_WIDGET',
//       payload: {
//         categoryName,
//         widgetId
//       }
//     });
//   };
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value.toLowerCase());
//   };

//   const filteredCategories = categories.map(category => ({
//     ...category,
//     widgets: category.widgets.filter(widget =>
//       widget.name.toLowerCase().includes(searchQuery) || widget.text.toLowerCase().includes(searchQuery)
//     )
//   }));

//   return (
//     <div>
//       <header>
//         <div className='nav-bar'>
//           <div className='left-side'>
//             <p>Home</p>
//             <p><ArrowBackIosIcon /></p>
//             <p id="dashboard-text">Dashboard</p>
//           </div>
//           <div className='search'>
//             <input type='text'  value={searchQuery}
//               onChange={handleSearchChange} placeholder='search something ....' />
//             <SearchIcon className='search-icon' />
//           </div>
//         </div>
//         <div className='sub-nav-left'>
//           <div className='dashboard-title'>CNAPP Dashboard</div>
//           <div className='button-container'>
//             <button className='btn' >Add Widget +</button>
//             <CachedIcon className='icon' />
//             <MoreVertIcon className='icon' />
//             <div className='watch-container'>
//               <WatchLaterIcon className='watch-icon' />
//               <span>Last 2 days</span>
//             </div>
//           </div>
//         </div>
//       </header>

    
//        {filteredCategories.map((category) => (
//         <div key={category.name}>
//           <h2 className='category-title'>{category.name}</h2>
//           <div className="widget-container">
//             {category.widgets.length > 0 ? (
//               category.widgets.map((widget) => (
//                 <div key={widget.id} className="widget">
//                   <h3>{widget.name}</h3>
//                   <p>{widget.text}</p>
//                   <p onClick={() => handleRemoveWidget(category.name, widget.id)}>X</p>
//                 </div>
//               ))
//             ) : (
//               <p>No widgets found</p>
//             )}
//             <button className='addwidget-button' onClick={() => togglePopUp(category.name)}>+ Add Widget</button>
//           </div>
//         </div>
//       ))}
//       {isPopUpOpen && (
//         <div className="popup">
       
//           <div className='popup-header'>
//      <h1>Add Widget {selectedCategory}</h1>
    

//       <button onClick={togglePopUp} className='close-btn'>X</button>
//        </div>


//        <div  className='popup-content' >
//        <p>Personalize your dashboard by adding the following widget</p>
//        <div className='content-header'>
//            <a className='header-items'>CSPM</a>
//            <a  className='header-items' >CWPP</a>
//              <a className='header-items' >Image</a>
//               <a  className='header-items'>Ticket</a>
//               </div>
//        <input
//             type="text"
//             placeholder="Widget Name......."
//             value={newWidgetName}
//             onChange={(e) => setNewWidgetName(e.target.value)}
//           />
//           <textarea
//             placeholder="Widget Text........"
//             value={newWidgetText}
//             onChange={(e) => setNewWidgetText(e.target.value)}
//           ></textarea>
//         </div>
//          <div className='popup-bottom-buttons'>
//           <button  className='bottom-btn' onClick={handleAddWidget}>Confirm</button>
//           <button className='bottom-btn' onClick={() => togglePopUp('')}>Cancel</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SearchIcon from '@mui/icons-material/Search';
import CachedIcon from '@mui/icons-material/Cached';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
// import "./Dashboard.css"
import "./index.css"
const Dashboard = () => {
  const categories = useSelector(state => state.widgets.categories);
  const dispatch = useDispatch();
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [newWidgetName, setNewWidgetName] = useState('');
  const [newWidgetText, setNewWidgetText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWidgets, setSelectedWidgets] = useState([]); // To track the checked widgets

  if (!categories) {
    return <div>Loading...</div>;
  }

  const togglePopUp = (categoryName) => {
    setSelectedCategory(categoryName);

    // Find the widgets for the selected category and mark them as selected
    const category = categories.find(cat => cat.name === categoryName);
    if (category) {
      setSelectedWidgets(category.widgets.map(widget => widget.id)); // Store the ids of the widgets
    }

    setIsPopUpOpen(!isPopUpOpen);
  };

  const handleAddWidget = () => {
    const newWidget = {
      id: Date.now(),
      name: newWidgetName,
      text: newWidgetText
    };

    dispatch({
      type: 'ADD_WIDGET',
      payload: {
        categoryName: selectedCategory,
        widget: newWidget
      }
    });

    setNewWidgetName('');
    setNewWidgetText('');
    togglePopUp('');
  };

  const handleRemoveWidget = (categoryName, widgetId) => {
    dispatch({
      type: 'REMOVE_WIDGET',
      payload: {
        categoryName,
        widgetId
      }
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleWidgetCheckboxChange = (widgetId) => {
    const isAlreadySelected = selectedWidgets.includes(widgetId);

    if (isAlreadySelected) {
      // If the widget is already selected, remove it
      setSelectedWidgets(selectedWidgets.filter(id => id !== widgetId));
      handleRemoveWidget(selectedCategory, widgetId);
    } else {
      // If the widget is not selected, add it
      setSelectedWidgets([...selectedWidgets, widgetId]);
    }
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchQuery) || widget.text.toLowerCase().includes(searchQuery)
    )
  }));

  return (
    <div>
      <header>
        <div className='nav-bar'>
          <div className='left-side'>
            <p>Home</p>
            <p><ArrowBackIosIcon /></p>
            <p id="dashboard-text">Dashboard</p>
          </div>
          <div className='search'>
            <input type='text' value={searchQuery} onChange={handleSearchChange} placeholder='Search something ....' />
            <SearchIcon className='search-icon' />
          </div>
        </div>
        <div className='sub-nav-left'>
          <div className='dashboard-title'>CNAPP Dashboard</div>
          <div className='button-container'>
            <button className='btn'>Add Widget +</button>
            <CachedIcon className='icon' />
            <MoreVertIcon className='icon' />
            <div className='watch-container'>
              <WatchLaterIcon className='watch-icon' />
              <span>Last 2 days</span>
            </div>
          </div>
        </div>
      </header>

      {filteredCategories.map((category) => (
        <div key={category.name}>
          <h2 className='category-title'>{category.name}</h2>
          <div className="widget-container">
            {category.widgets.length > 0 ? (
              category.widgets.map((widget) => (
                <div key={widget.id} className="widget">
                  <h3>{widget.name}</h3>
                  <p>{widget.text}</p>
                  <p onClick={() => handleRemoveWidget(category.name, widget.id)}>X</p>
                </div>
              ))
            ) : (
              <p>No widgets found</p>
            )}
            <button className='addwidget-button' onClick={() => togglePopUp(category.name)}>+ Add Widget</button>
          </div>
        </div>
      ))}

      {isPopUpOpen && (
        <div className="popup">
          <div className='popup-header'>
            <h1>Add Widget {selectedCategory}</h1>
            <button onClick={togglePopUp} className='close-btn'>X</button>
          </div>

          <div className='popup-content'>
            <p>Personalize your dashboard by adding the following widgets:</p>
            <div className='content-header'>
              <a className='header-items'>CSPM</a>
              <a className='header-items'>CWPP</a>
              <a className='header-items'>Image</a>
              <a className='header-items'>Ticket</a>
            </div>

            <input
              type="text"
              placeholder="Widget Name......."
              value={newWidgetName}
              onChange={(e) => setNewWidgetName(e.target.value)}
            />
            <textarea
              placeholder="Widget Text........"
              value={newWidgetText}
              onChange={(e) => setNewWidgetText(e.target.value)}
            ></textarea>

            <h3>Existing Widgets in {selectedCategory}</h3>
            <div className='widget-list'>
              {categories.find(cat => cat.name === selectedCategory)?.widgets.map(widget => (
                <div key={widget.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedWidgets.includes(widget.id)}
                      onChange={() => handleWidgetCheckboxChange(widget.id)}
                    />
                    {widget.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className='popup-bottom-buttons'>
            <button className='bottom-btn' onClick={handleAddWidget}>Confirm</button>
            <button className='bottom-btn' onClick={() => togglePopUp('')}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
