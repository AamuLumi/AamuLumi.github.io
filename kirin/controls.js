const panel = FD.create("div", {
  style: {
    backgroundColor: "rgba(255, 255, 255, .4)",
    borderRadius: "2px",
    fontSize: "0.75em",
    fontFamily: "sans-serif",
    padding: 8,

    position: "absolute",
    bottom: 16,
    right: 16,
  },
});

document.body.appendChild(panel);

const Controls = {
  _active: [],
};

Controls.add = (controller) => {
  Controls._active.push(controller);
  panel.appendChild(controller.component);
};

Controls.createInput = ({ type, value, onChange }) => {
  const component = FD.create("input", {
    type,
    value,
  });

  component.addEventListener("change", onChange);

  return {
    component,
  };
};

Controls.createRange = ({ min, max, text, value, onChange }) => {
  const component = FD.create(
    "div",
    {
      style: {
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
      },
    },
    [
      FD.create("label", {
        style: {
          color: "white",
        },
        innerText: text,
      }),
      FD.create("input", {
        min,
        max,
        type: "range",
        value,
      }),
    ]
  );

  component.addEventListener("change", onChange);

  return {
    component,
  };
};
