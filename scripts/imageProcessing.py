import cv2
import numpy as np
import logging

logging.basicConfig(level=logging.INFO)

def compare_images(image_path1, image_path2):
    """
    Compares two images for similarity using feature extraction.
    Returns:
    - float: The similarity score between the two images.
    """
    try:
        # Load the images
        img1 = cv2.imread(image_path1)
        img2 = cv2.imread(image_path2)
        
        if img1 is None or img2 is None:
            logging.error("One of the images could not be loaded. Please check the file paths.")
            return None

        # Convert the images to grayscale
        gray1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
        gray2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)
        
        # Initialize the ORB detector
        orb = cv2.ORB_create()
        
        # Detect keypoints and descriptors
        keypoints1, descriptors1 = orb.detectAndCompute(gray1, None)
        keypoints2, descriptors2 = orb.detectAndCompute(gray2, None)
        
        # Create BFMatcher object
        bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
        
        # Match descriptors
        matches = bf.match(descriptors1, descriptors2)
        
        # Sort matches in the order of their distance
        matches = sorted(matches, key=lambda x:x.distance)
        
        # Calculate similarity based on the top N matches
        top_matches = matches[:10]  # Consider top 10 matches
        similarity_score = sum([match.distance for match in top_matches]) / len(top_matches)
        
        logging.info(f"Image comparison completed successfully. Similarity score: {similarity_score}")
        return similarity_score
    except Exception as e:
        logging.error(f"An error occurred during image comparison: {e}", exc_info=True)
        return None

if __name__ == "__main__":
    score = compare_images('../imageOne.jpeg', '../imageThree.jpeg')  
    if score is not None:
        print(f"Similarity score: {score}")
    else:
        print("Image comparison failed.")