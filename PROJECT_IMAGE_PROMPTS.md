# Project Image Generation Prompts

Use these prompts with AI image generators like Leonardo.ai, Adobe Firefly, or Midjourney to create thumbnails for your projects.

## Project 1: Two-tier Flaskapp Deployment
**Prompt:**
```
Modern DevOps dashboard showing Docker containers and Kubernetes pods, Flask application architecture diagram, blue and purple gradient background, clean tech illustration style, MySQL database icons, CI/CD pipeline visualization, professional tech thumbnail, 16:9 aspect ratio
```

**Keywords:** Docker, Kubernetes, Flask, MySQL, Jenkins, CI/CD
**Color Scheme:** Blue and purple (primary colors)

---

## Project 2: Node.js To-Do CI/CD Pipeline
**Prompt:**
```
Node.js application deployment pipeline, Jenkins automation workflow, Docker containers in AWS cloud, green and teal gradient background, modern tech illustration, automated testing icons, CI/CD flow diagram, professional DevOps thumbnail, 16:9 aspect ratio
```

**Keywords:** Node.js, Jenkins, Docker, AWS, Terraform
**Color Scheme:** Green and teal (secondary colors)

---

## Project 3: Scalable AWS Deployment with Kubernetes
**Prompt:**
```
Amazon EKS cluster visualization, Kubernetes orchestration with Helm charts, AWS VPC network architecture, scalable cloud infrastructure, blue gradient background with cloud icons, 99.9% uptime badge, professional cloud computing thumbnail, 16:9 aspect ratio
```

**Keywords:** Amazon EKS, Kubernetes, Helm, Terraform, AWS VPC
**Color Scheme:** AWS orange and blue (primary colors)

---

## Project 4: Cost-Efficient CI/CD Pipeline Management
**Prompt:**
```
Cost optimization dashboard with graphs showing 40% reduction, Jenkins pipeline with AWS Lambda functions, CloudWatch monitoring interface, green and gold gradient background, financial charts and DevOps icons, professional cost management thumbnail, 16:9 aspect ratio
```

**Keywords:** Jenkins, Terraform, AWS Lambda, CloudWatch, Cost Explorer
**Color Scheme:** Green and gold (secondary colors)

---

## General Style Guidelines

- **Aspect Ratio:** 16:9 (1920x1080 or 1280x720)
- **Style:** Modern, clean, professional tech illustration
- **Elements:** Include relevant tech logos/icons, architecture diagrams, gradient backgrounds
- **Text:** Minimal or no text (let the design speak)
- **Colors:** Match your brand colors (primary: blue/purple, secondary: green/teal)

---

## Quick Generation Steps

1. Visit [Leonardo.ai](https://leonardo.ai/ai-image-generator/) or your preferred AI image generator
2. Copy the prompt for each project
3. Generate the image (may take 1-2 attempts to get the perfect result)
4. Download as PNG or JPG
5. Save to your `public` folder with descriptive names:
   - `public/two-tier-flaskapp.jpg`
   - `public/nodejs-todo-cicd.jpg`
   - `public/scalable-aws-kubernetes.jpg`
   - `public/cost-efficient-cicd.jpg`

---

## Alternative: Use Placeholder Services

If you want quick placeholder images while working on custom ones:

- **Unsplash:** https://unsplash.com/s/photos/devops
- **Pexels:** https://www.pexels.com/search/technology/
- **Placeholder.com:** https://via.placeholder.com/1280x720/4F46E5/FFFFFF?text=Project+Name

---

## Update Your Code

After generating images, update `src/data/projects.ts`:

```typescript
{
  slug: 'two-tier-flaskapp',
  image: '/two-tier-flaskapp.jpg',  // Update this
  // ... rest of config
}
```
