<template>
    <div>
        <h1>Blogs</h1>
        <pre>{{ fetchError }}</pre>
        <ul>
            <li v-for="(item, itemIdx) in data.items" :key="itemIdx">
                <NuxtLink :to="`/blog/${item.slug}`">{{ item.title }}</NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import type { BlogsResponse } from '~/server/api/blog/all';

const { data, error: fetchError } = await useFetch<BlogsResponse>('/api/blog/all');
</script>
