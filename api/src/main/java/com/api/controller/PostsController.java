package com.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.api.model.Post;
import com.api.repository.PostRepository;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class PostsController {

    @Autowired
    private PostRepository postRepository;

    @GetMapping
    public List<Post> getPosts() {
        return postRepository.findAll();
    }

    @PostMapping
    public Post createPost(@RequestBody Post post, Authentication auth) {
        post.setAuthor(auth.getName());
        post.setCreatedBy(auth.getName()); // Diese Zeile hinzufügen
        return postRepository.save(post);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id, Authentication auth) {
        Post post = postRepository.findById(id).orElseThrow();
        if (!post.getAuthor().equals(auth.getName())) {
            return ResponseEntity.status(403).body("Nur der Ersteller kann diesen Beitrag löschen");
        }
        postRepository.deleteById(id);
        return ResponseEntity.ok().body("Post gelöscht");
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<?> likePost(@PathVariable Long id) {
        Post post = postRepository.findById(id).orElseThrow();
        post.setLikes(post.getLikes() + 1);
        postRepository.save(post);
        return ResponseEntity.ok("Post geliked");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(@PathVariable Long id, @RequestBody Post updatedPost, Authentication auth) {
        Post post = postRepository.findById(id).orElseThrow();
        if (!post.getAuthor().equals(auth.getName())) {
            return ResponseEntity.status(403).body("Nur der Ersteller kann diesen Beitrag bearbeiten");
        }
        post.setTitle(updatedPost.getTitle());
        post.setText(updatedPost.getText());
        postRepository.save(post);
        return ResponseEntity.ok(post);
    }
}
