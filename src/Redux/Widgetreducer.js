const initialState = {
  "categories": [
    {
      "name": "CSPM Executive Dashboard",
      "widgets": [
        {
          "id": 1,
          "name": "Cloud Accounts",
          "text": "Connected (2) - Not Connected (2)"
        },
        {
          "id": 2,
          "name": "Cloud Account Risk Assessment",
          "text": "Failed (1685) - Warning (681) - Not available (26) - Passed (7251)"
        }
      ]
    },
    {
      "name": "CWPP Dashboard",
      "widgets": [
        {
          "id": 3,
          "name": "Top 5 Namespace Specific Alerts",
          "text": "No Graph data available!"
        },
        {
          "id": 4,
          "name": "Workload Alerts",
          "text": "No Graph data available!"
        }
      ]
    },
    {
      "name": "Registry Scan",
      "widgets": [
        {
          "id": 5,
          "name": "Image Risk Assessment",
          "text": "1470 Total Vulnerabilities - Critical (2) - High (56)"
        },
        {
          "id": 6,
          "name": "Image Security Issues",
          "text": "2 Total Images - Critical (2) - High (4)"
        }
      ]
    }
  ]
}

const widgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_WIDGET': {
      const { categoryName, widget } = action.payload;
      return {
        ...state,
        categories: state.categories.map(category =>
          category.name === categoryName
            ? { ...category, widgets: [...category.widgets, widget] }
            : category
        )
      };
    }
    case 'REMOVE_WIDGET': {
      const { categoryName, widgetId } = action.payload;
      return {
        ...state,
        categories: state.categories.map(category =>
          category.name === categoryName
            ? { ...category, widgets: category.widgets.filter(widget => widget.id !== widgetId) }
            : category
        )
      };
    }
    default:
      return state;
  }
};

export default widgetReducer;
