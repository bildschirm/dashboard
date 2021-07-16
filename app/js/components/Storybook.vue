<template>
	<article>
		<!-- 
			=== BUTTON COMPONENTS ===
		-->
		<h2 class="font-bold text-2xl mb-5">Button component</h2>
		<CodeExample label="Button" :code="`<Button>Hello World!</Button>`">
			<Button>Hello World!</Button>
		</CodeExample>

		<CodeExample
			label="forms/Button (loading)"
			:code="`<Button loading>Loading...</Button>`"
		>
			<Button loading>Loading...</Button>
		</CodeExample>

		<CodeExample
			label="buttons/SmartButton"
			:code="`<SmartButton>Hello World!</SmartButton>`"
		>
			<SmartButton icon="home">Hello World!</SmartButton>
		</CodeExample>

		<CodeExample
			label="buttons/SmartButton (active)"
			:code="
				`<SmartButton icon=&quot;home&quot; active>Hello World!</SmartButton>`
			"
		>
			<SmartButton icon="home" active>Hello World!</SmartButton>
		</CodeExample>

		<CodeExample
			label="buttons/SmartButton (toggle)"
			:code="
				`<SmartButton
	icon=&quot;heart&quot;
	:active=&quot;active&quot;
	@click=&quot;inputs.active = !inputs.active&quot;
>
	Toggle me!
</SmartButton>`
			"
		>
			<SmartButton
				icon="heart"
				:active="inputs.smartButtonActive"
				@click="inputs.smartButtonActive = !inputs.smartButtonActive"
			>
				Toggle me!
			</SmartButton>

			<SmartButton
				icon="heart"
				:active="inputs.smartButtonActive"
				@click="inputs.smartButtonActive = !inputs.smartButtonActive"
			>
				Toggle me!
			</SmartButton>
		</CodeExample>

		<Divider />

		<!-- 
			=== INPUT COMPONENTS ===
		-->
		<h2 class="font-bold text-2xl mb-5">Input components</h2>

		<!-- TextInput with Label -->
		<CodeExample
			label="forms/TextInput with forms/Label"
			:code="
				`<Label name=&quot;input&quot; label=&quot;Example Input&quot;>
	<TextInput
		name=&quot;input&quot;
		type=&quot;text&quot;
		placeholder=&quot;Example Input (e.g. 'test')&quot;
	/>
</Label>`
			"
		>
			<Label name="input" label="Example Input">
				<TextInput
					name="input"
					type="text"
					placeholder="Example Input (e.g. 'test')"
				/>
			</Label>
		</CodeExample>

		<!-- TextInput (type: text) -->
		<CodeExample
			label="forms/TextInput (type: text)"
			:code="
				`<TextInput
	name=&quot;input&quot;
	placeholder=&quot;Example Input (e.g. 'test')&quot;
	loading
	required
/>`
			"
		>
			<TextInput name="input2" placeholder="Example Input 2" />
		</CodeExample>

		<!-- TextInput (type: password) -->
		<CodeExample
			label="forms/TextInput (type: password)"
			:code="
				`<TextInput 
	type=&quot;password&quot; 
	placeholder=&quot;Password&quot; 
	value=&quot;hunter2&quot; 
/>`
			"
		>
			<TextInput
				name="input3"
				type="password"
				placeholder="Password"
				value="hunter2"
			/>
		</CodeExample>

		<!-- TextInput (type: email) -->
		<CodeExample
			label="forms/TextInput (type: email)"
			:code="
				`<TextInput 
	type=&quot;email&quot; 
	placeholder=&quot;E-Mail address&quot; 
	value=&quot;user@example.com&quot; 
/>`
			"
		>
			<TextInput
				name="input4"
				type="email"
				placeholder="E-Mail address"
				value="user@example.com"
				required
			/>
		</CodeExample>

		<!-- TextInput (type: number) -->
		<CodeExample
			label="forms/TextInput (type: number)"
			:code="
				`<TextInput 
	type=&quot;number&quot; 
	placeholder=&quot;Number&quot; 
	value=&quot;420&quot; 
/>`
			"
		>
			<TextInput
				name="input5"
				type="number"
				placeholder="Number"
				value="420"
				required
			/>
		</CodeExample>

		<!-- CodeInput -->
		<CodeExample
			label="forms/CodeInput"
			:code="
				`<CodeInput
	name=&quot;code&quot;
	lang=&quot;json&quot;
	v-model=&quot;code&quot;
/>`
			"
		>
			<CodeInput name="code" lang="json" v-model="inputs.code" />
		</CodeExample>

		<Divider />

		<!-- 
			=== LOADING COMPONENTS ===
		-->

		<h2 class="font-bold text-2xl mb-5">Loading component</h2>

		<!-- Spinner -->
		<CodeExample
			label="loading/Spinner"
			:code="`<Spinner class=&quot;w-5&quot; />`"
		>
			<Spinner class="w-5" />
		</CodeExample>

		<!-- Spinner with iconClass set -->
		<CodeExample
			label="loading/Spinner (iconClass)"
			:code="`<Spinner iconClass=&quot;w-5&quot; />`"
		>
			<Spinner iconClass="w-5" />
		</CodeExample>

		<!-- FullScreenSpinner -->
		<CodeExample
			label="loading/FullScreenSpinner"
			:code="`<FullScreenSpinner />`"
		>
			<FullScreenSpinner />
		</CodeExample>
	</article>
</template>

<script>
import Button from './forms/Button';
import Label from './forms/Label';
import TextInput from './forms/TextInput';
import CodeInput from './forms/CodeInput';
import Panel from './common/Panel';
import FullScreenSpinner from './loading/FullScreenSpinner';
import Spinner from './loading/Spinner';

import SmartButton from './buttons/SmartButton';

const Divider = {
	template: `<div class="w-full my-10 h-1 bg-purple-700" />`,
};

const CodeExample = {
	components: {
		Panel,
		Label,
		CodeInput,
	},
	props: {
		label: {
			type: String,
			default: '',
		},
		code: {
			type: String,
		},
	},
	template: `
		<section class="grid grid-cols-2 mb-5">
			<p class="mb-2 font-mono text-lg">{{ label }}</p>
			<div>
				<Label label="Example Code" class="mb-5" v-if="code">
					<CodeInput
						lang="html"
						v-model="code"
						readonly
					/>
				</Label>
				<Label label="Preview">
					<Panel class="relative">
						<slot></slot>
					</Panel>
				</Label>
			</div>
		</section>
	`,
};

export default {
	components: {
		Button,
		Divider,
		Label,
		TextInput,
		CodeInput,
		Panel,
		CodeExample,
		FullScreenSpinner,
		Spinner,
		SmartButton,
	},
	data: () => ({
		inputs: {
			smartButtonActive: true,
			code: `{ 
	"type": "Example JSON" 
}`,
		},
	}),
	computed: {},
};
</script>

<style></style>
