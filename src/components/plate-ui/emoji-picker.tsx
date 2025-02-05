'use client';

import type { UseEmojiPickerType } from '@udecode/plate-emoji/react';
import React from 'react';

import { cn } from '@udecode/cn';
import { EmojiSettings } from '@udecode/plate-emoji';

import { EmojiPickerContent } from './emoji-picker-content';
import { EmojiPickerNavigation } from './emoji-picker-navigation';
import { EmojiPickerPreview } from './emoji-picker-preview';
import { EmojiPickerSearchAndClear } from './emoji-picker-search-and-clear';
import { EmojiPickerSearchBar } from './emoji-picker-search-bar';

export function EmojiPicker({
  clearSearch,
  i18n,
  isSearching,
  refs,
  searchResult,
  searchValue,
  setSearch,
  settings = EmojiSettings,
  emoji,
  emojiLibrary,
  focusedCategory,
  handleCategoryClick,
  hasFound,
  icons,
  onMouseOver,
  onSelectEmoji,
  visibleCategories,
}: UseEmojiPickerType) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-xl bg-popover text-popover-foreground',
        'h-[23rem] w-80 border shadow-md'
      )}
    >
      <EmojiPickerNavigation
        emojiLibrary={emojiLibrary}
        focusedCategory={focusedCategory}
        icons={icons}
        onClick={handleCategoryClick}
        i18n={i18n}
      />
      <EmojiPickerSearchBar
        i18n={i18n}
        searchValue={searchValue}
        setSearch={setSearch}
      >
        <EmojiPickerSearchAndClear
          clearSearch={clearSearch}
          i18n={i18n}
          searchValue={searchValue}
        />
      </EmojiPickerSearchBar>
      <EmojiPickerContent
        refs={refs}
        emojiLibrary={emojiLibrary}
        onMouseOver={onMouseOver}
        onSelectEmoji={onSelectEmoji}
        visibleCategories={visibleCategories}
        i18n={i18n}
        isSearching={isSearching}
        searchResult={searchResult}
        settings={settings}
      />
      <EmojiPickerPreview
        emoji={emoji}
        hasFound={hasFound}
        i18n={i18n}
        isSearching={isSearching}
      />
    </div>
  );
}
