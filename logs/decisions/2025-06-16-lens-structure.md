# Decision: Use Dynamic Beam Page with JSON Loader

**Date:** 2025-06-16  
**Made by:** Steve  

## Why
To ensure future scalability of the lens system across any project or user.

## Decision
Use a single beam.html file that loads beam data dynamically based on a URL parameter and beams.json.

## Implications
- Only one page needed
- No hard-coded project names
- Easy to reuse across sprints or users
