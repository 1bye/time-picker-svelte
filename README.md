> [!WARNING]  
> Currently time picker only works with Svelte Runes!

# Time Picker Component for Svelte

This project is a Svelte adaptation of the [TimePickerInput](https://time.openstatus.dev/) component, originally built with React and Shadcn UI. The Svelte version utilizes [svelte-shadcn](https://next.shadcn-svelte.com/docs/installation/sveltekit) components to provide a customizable and accessible time picker for your applications.

## Features

- **Keyboard Navigation**: Supports arrow key navigation for time selection.
- **Date Formatting**: Formats date values for display.
- **Mobile Optimization**: Enhances mobile keyboard interactions for time input.

## Demo
- **Docs/Demo**: [link](https://time-picker.nouro.app/)
- **REPL playground**: [link](https://www.sveltelab.dev/zjcmgpaa2tzlylx)

## Installation

**Note**: This component currently works only with SvelteKit projects. Attempting to set up shadcn-svelte on a Svelte project without SvelteKit may result in issues.

> [!TIP]  
> Time picker can be used without shadcn, but you should a little change code (few lines)

Before integrating the time picker component, ensure your project includes the following dependencies:

- [bits-ui](https://www.npmjs.com/package/bits-ui)
- [@internationalized/date](https://www.npmjs.com/package/@internationalized/date)

Additionally, install the necessary svelte-shadcn components:

- Input (required)
- Label (optional, for [time-picker.svelte](./src/lib/snippets/time-picker.svelte))
- Select (optional, for period selection)
- Calendar (optional, for date and time selection)
- Popover (optional, for date and time selection)
- Button (optional, for date and time selection)

### Steps to Install

1. **Initialize shadcn-svelte in your SvelteKit project**:

   ```bash
   npx shadcn-svelte@latest init
   ```

   Follow the prompts to configure your project. Ensure you have TypeScript and Tailwind CSS set up, as the command assumes a SvelteKit project with these configurations.

2. **Add the required components**:

   ```bash
   npx shadcn-svelte@latest add input select calendar popover button
   ```

   This command will add the specified components to your project.

3. **Install additional dependencies**:

   ```bash
   npm install bits-ui @internationalized/date
   ```

   Ensure these packages are added to your `package.json` and installed in your project.

4. **Copy main snippets**
   
   Copy [`time-picker-input.svelte`](./src/lib/snippets/time-picker-input.svelte) and [`time-picker-utils.ts`](./src/lib/snippets/time-picker-utils.ts) into your project. (For example into `$lib/components/ui/time-picker`)

## Usage

After installation, you can [copy snippets](./src/lib/snippets/) and use the time picker components in your Svelte files.

Customize the component as needed to fit your application's requirements.

## Acknowledgments

This component is inspired by the original [TimePicker](https://time.openstatus.dev/) by OpenStatus and utilizes components from [svelte-shadcn](https://next.shadcn-svelte.com/docs/installation/sveltekit). 
Special thanks to the contributors of these projects for their excellent work. 