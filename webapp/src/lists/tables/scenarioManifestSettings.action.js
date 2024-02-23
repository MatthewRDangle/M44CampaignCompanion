import manifestStore from "../../stores/Manifest.store";


export default [
    {
        label: 'Delete',
        onClick: async (manifest) => {
            await manifestStore.deleteOneScenarioManifest(manifest);
        },
    },
]