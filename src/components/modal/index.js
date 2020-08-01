const CLOSE_EVENT = "close";
const ERROR_EVENT = "error";

const composeModal = (component, args) => {
	return Promise.resolve(component).then((component) => ({
		extends: component,
		methods: {
			$close(data) {
				this.$emit(CLOSE_EVENT, data);
			},
			$error(data) {
				this.$emit(ERROR_EVENT, data);
			},
		},
	}));
};

// Component.vue
export const create = (component, ...args) => {
	console.log(args);

	if (!component) {
		console.error("Modal component cannot be null or undefined");
		return null;
	}

	const modalComponent = composeModal(component, args);

	return modalComponent.then((item) => {
		// const parent = item.extends;
	});
};
