# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Neofit homepage project - a Korean fitness platform website that showcases NEO HIVE (team-based fitness solution) and NEO SMART (NFC-based smart training system).

## Project Structure

- `neofit.html` - Main website file containing all HTML, CSS, and JavaScript
- `neofit_backup.html` - Backup version of the main file
- `images/` - Directory containing all image assets (logos, backgrounds, UI elements)
- `videos/` - Directory containing video files for NEO products demonstrations

## Key Development Tasks

### Running the Website
Since this is a static HTML website, simply open `neofit.html` in a web browser to view the site.

### Common Modifications

1. **Mobile UI Positioning**: Many UI elements use CSS transforms with Korean units (칸):
   - 1칸 = 16px
   - Use `translateY()` for vertical positioning
   - JavaScript array controls mobile element positions

2. **Language Context**: The site is in Korean. Common terms:
   - 칸 = unit (16px)
   - 위로 = up
   - 아래로 = down
   - 좌측/우측 = left/right
   - 삭제 = delete
   - 수정 = modify

## Architecture Notes

### CSS Organization
- Mobile-first approach with extensive media queries
- Heavy use of `!important` to override inline styles
- Transform-based positioning for mobile layouts
- Z-index layering for complex overlapping elements

### JavaScript Components
1. **Mobile Position Control**: Array-based transform management for responsive elements
2. **Video Players**: Custom video players with speaker controls
3. **Form Modal**: Partner application form with validation
4. **Card Animations**: 3D card flip effects and carousel functionality
5. **Facility Gallery**: Image slider with popup modal for facility photos

### Key Sections
- Hero section with animated backgrounds
- NEO HIVE showcase (team fitness solution)
- NEO SMART showcase (NFC training system)
- NEOFit training cards (Sync, Balance, Boost)
- Benefits section with facility gallery
- Partner application form

## Important Considerations

1. **Mobile Responsiveness**: Extensive mobile-specific positioning using transforms
2. **Browser Compatibility**: Uses webkit prefixes for Safari compatibility
3. **Performance**: Heavy use of CSS animations and transforms
4. **Inline Styles**: Many elements have inline styles that require `!important` to override

## Testing Approach
- Test on both desktop and mobile viewports
- Check transform positioning on actual mobile devices
- Verify popup modals and video playback functionality
- Test form submission and validation