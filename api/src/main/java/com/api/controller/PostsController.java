package com.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.api.model.Post;
import com.api.repository.PostRepository;
import org.springframework.security.core.Authentication;
import java.util.HashSet;


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
        post.setCreatedBy(auth.getName());

        if (post.getLikes() == null) {
            post.setLikes(new HashSet<>());
        }

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
    public ResponseEntity<Post> likePost(@PathVariable Long id, Authentication auth) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post nicht gefunden!"));

        String userEmail = auth.getName(); // Aktuell eingeloggter Benutzer

        if (post.getLikes().contains(userEmail)) {
            post.getLikes().remove(userEmail); // Unlike
        } else {
            post.getLikes().add(userEmail); // Like
        }

        postRepository.save(post);
        return ResponseEntity.ok(post);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(@PathVariable Long id, @RequestBody Post updatedPost, Authentication auth) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post nicht gefunden!"));

        // Nur der Ersteller darf bearbeiten
        if (!post.getCreatedBy().equals(auth.getName())) {
            return ResponseEntity.status(403).body("Du kannst nur deine eigenen Posts bearbeiten!");
        }

        // Felder aktualisieren (nur wenn sie nicht null sind)
        if (updatedPost.getTitle() != null) {
            post.setTitle(updatedPost.getTitle());
        }
        if (updatedPost.getText() != null) {
            post.setText(updatedPost.getText());
        }

        // Likes NICHT überschreiben!
        postRepository.save(post);
        return ResponseEntity.ok(post);
    }

}