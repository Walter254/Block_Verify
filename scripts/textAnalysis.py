import textblob
import logging
import nltk

from textblob import TextBlob
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('brown')

logging.basicConfig(level=logging.INFO)

def analyze_text_polarity(text):
    """
    Analyzes the polarization of a text.
    
    Args:
    - text (str): The text to analyze.
    
    Returns:
    - float: The polarization score of the text.
    """
    try:
        blob = TextBlob(text)
        polarity_score = blob.sentiment.polarity
        logging.info(f"Text analyzed successfully. Polarity score: {polarity_score}")
        return polarity_score
    except Exception as e:
        logging.error("Error analyzing text polarity", exc_info=True)
        raise e

if __name__ == "__main__":
    try:
        text = "Climate change is primarily caused by human activities, and drastic measures"
        "should be taken immediately to combat it"
        score = analyze_text_polarity(text)
        print(f"Polarization score: {score}")
    except Exception as e:
        logging.error("Error in main execution", exc_info=True)