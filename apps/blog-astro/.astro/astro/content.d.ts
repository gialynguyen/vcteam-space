declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"drafts": {
"sample-draft-post.mdx": {
	id: "sample-draft-post.mdx";
  slug: "sample-draft-post";
  body: string;
  collection: "drafts";
  data: any
} & { render(): Render[".mdx"] };
};
"react-useeffect-cleanup": {
"react-useeffect-cleanup.mdx": {
	id: "react-useeffect-cleanup.mdx";
  slug: "react-useeffect-cleanup";
  body: string;
  collection: "react-useeffect-cleanup";
  data: any
} & { render(): Render[".mdx"] };
};
"series-learn-go": {
"day-1/series-learn-go-day-1.mdx": {
	id: "day-1/series-learn-go-day-1.mdx";
  slug: "day-1/series-learn-go-day-1";
  body: string;
  collection: "series-learn-go";
  data: any
} & { render(): Render[".mdx"] };
"day-2/series-learn-go-day-2.mdx": {
	id: "day-2/series-learn-go-day-2.mdx";
  slug: "day-2/series-learn-go-day-2";
  body: string;
  collection: "series-learn-go";
  data: any
} & { render(): Render[".mdx"] };
};
"series-solidjs": {
"episode-1/series-solidjs-episode-1.mdx": {
	id: "episode-1/series-solidjs-episode-1.mdx";
  slug: "episode-1/series-solidjs-episode-1";
  body: string;
  collection: "series-solidjs";
  data: any
} & { render(): Render[".mdx"] };
"episode-2/series-solidjs-episode-2.mdx": {
	id: "episode-2/series-solidjs-episode-2.mdx";
  slug: "episode-2/series-solidjs-episode-2";
  body: string;
  collection: "series-solidjs";
  data: any
} & { render(): Render[".mdx"] };
"episode-3/series-solidjs-episode-3.mdx": {
	id: "episode-3/series-solidjs-episode-3.mdx";
  slug: "episode-3/series-solidjs-episode-3";
  body: string;
  collection: "series-solidjs";
  data: any
} & { render(): Render[".mdx"] };
"episode-4/series-solidjs-episode-4.mdx": {
	id: "episode-4/series-solidjs-episode-4.mdx";
  slug: "episode-4/series-solidjs-episode-4";
  body: string;
  collection: "series-solidjs";
  data: any
} & { render(): Render[".mdx"] };
};
"when-dont-use-react-useeffect": {
"when-dont-use-react-useeffect.mdx": {
	id: "when-dont-use-react-useeffect.mdx";
  slug: "when-dont-use-react-useeffect";
  body: string;
  collection: "when-dont-use-react-useeffect";
  data: any
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
