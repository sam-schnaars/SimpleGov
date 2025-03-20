import pandas as pd
import os
from datetime import datetime

def convert_survey_to_empathy_format(survey_file, output_file=None):
    """
    Convert survey data to empathy interview format.
    
    Parameters:
    survey_file (str): Path to the survey Excel/CSV file
    output_file (str): Path to save the output file (will use same format as input)
    
    Returns:
    pandas.DataFrame: The formatted empathy interview data
    """
    # Determine file type and read accordingly
    if survey_file.endswith('.xlsx') or survey_file.endswith('.xls'):
        survey_data = pd.read_excel(survey_file)
    elif survey_file.endswith('.csv'):
        survey_data = pd.read_csv(survey_file)
    else:
        raise ValueError("Input file must be Excel (.xlsx/.xls) or CSV (.csv)")
    
    # Create empty dataframe for empathy interview format
    empathy_data = []
    
    # Process each survey response
    for idx, row in survey_data.iterrows():
        # Helper function to safely get values
        def get_value(key):
            if key in row and pd.notna(row[key]):
                return row[key]
            return "N/A"
        
        # Create basic demographic information
        demographic = f"Age: {get_value('How old are you?')}, " \
                      f"Location: {get_value('Where are you from? Please abbreviate (CA = California, FRA = France) ')}, " \
                      f"Voter: {get_value('Did you vote in the most recent election?')}"
        
        # Format interview notes
        interview_notes = [
            "Stakeholder Thoughts:",
            f"- Cares about representatives' activity: {get_value('How much do you care about what your representatives do in Congress (e.g., their roll call votes)?\\n(Scale: 1 = Not important, 10 = Extremely important)')}",
            f"- Follows representatives: {get_value('On a scale between 1 to 10  how closely do you follow your representatives\' activities? \\n(Scale: 1=Not at all, 10= Very closely)')}",
            f"- Concern about financial conflicts: {get_value('How concerned are you about politicians\' financial investments and potential conflicts of interest? \\n(Scale: 1=Not concerned at all, 10=Extremely concerned)')}",
            f"- Trust in representatives: {get_value('How much do you trust your elected representatives to act in your best interest? \\n(Scale: 1 = Not at all, 10 = Completely)')}",
            f"- Likelihood to use tracking app: {get_value('How likely are you to use an app that tracks political lobbying and donations? (Scale: 1 = Not likely at all, 10 = Extremely likely)')}",
            f"- Concern about lobbying influence: {get_value('On a scale from 1 to 10, how concerned are you about lobbying\'s influence on legislation? (Scale: 1 = Not at All, 10 = Extremely Concerned)')}",
            "",
            "Suggested Problem:",
            f"- Transparency concern: {get_value('To what extent do you believe there is sufficient transparency in campaign, party, and candidate funding?')}",
            f"- Lobbying impact: {get_value('How significant do you believe lobbying\'s impact is on policy decisions?   (Scale: 1 = Not significant at all, 10 = Extremely significant)')}",
            f"- Opinion on corporate donations: {get_value('Do you believe politicians should be allowed to receive campaign donations from corporations or interest groups?')}",
            f"- Industries with most influence: {get_value('Which industries do you think exert the most influence over politicians? (Select up to 3) ')}",
            f"- Frequency of prioritizing financial incentives: {get_value('How often do you think politicians prioritize financial incentives over public interest?')}",
            "",
            "Suggested solution (optional):",
            f"- Information sources: {get_value('Where do you typically find information about new political candidates? (Select all that apply)')}",
            f"- Tracking methods: {get_value('How do you track individual politicians\' investments? (Select all that apply)')}",
            f"- Desired app features: {get_value('Which features would you find most useful in an app about political transparency? (Select up to 3)')}",
            f"- Additional desired information: {get_value('What additional information would you like to see about your representatives in a political transparency app?')}"
        ]
        interview_notes = "\n".join(interview_notes)
        
        # Generate quotes based on strong opinions
        quotes = []
        transparency = get_value("To what extent do you believe there is sufficient transparency in campaign, party, and candidate funding?")
        if transparency == "Not at all":
            quotes.append('"There is no transparency in campaign and candidate funding."')
        
        conflicts = get_value("How concerned are you about politicians' financial investments and potential conflicts of interest? \n(Scale: 1=Not concerned at all, 10=Extremely concerned)")
        if isinstance(conflicts, (int, float)) and conflicts >= 8:
            quotes.append('"I am extremely concerned about conflicts of interest in politicians\' financial investments."')
        
        trust = get_value("How much do you trust your elected representatives to act in your best interest? \n(Scale: 1 = Not at all, 10 = Completely)")
        if isinstance(trust, (int, float)) and trust <= 3:
            quotes.append('"I have very little trust that my representatives act in my best interest."')
        elif isinstance(trust, (int, float)) and trust >= 8:
            quotes.append('"I have strong trust in my representatives to act in my best interest."')
        
        donations = get_value("Do you believe politicians should be allowed to receive campaign donations from corporations or interest groups?")
        if donations == "No":
            quotes.append('"Politicians should not be allowed to receive any donations from corporations or interest groups."')
        elif donations == "Only with strict regulations":
            quotes.append('"Corporate donations to politicians should only be allowed with strict regulations."')
        
        direct_quotes = "\n".join(quotes)
        
        # Create pain points
        pain_points = []
        if transparency == "Not at all" or transparency == "Mostly insufficient":
            pain_points.append("Lack of transparency in campaign/political funding")
        
        if isinstance(conflicts, (int, float)) and conflicts >= 7:
            pain_points.append("High concern about politicians' conflicts of interest")
        
        if isinstance(trust, (int, float)) and trust <= 4:
            pain_points.append("Low trust in representatives to act in public interest")
        
        priority = get_value("How often do you think politicians prioritize financial incentives over public interest?")
        if priority == "Always" or priority == "Often":
            pain_points.append("Believes politicians often prioritize financial incentives over public interest")
        
        pain_points_text = "\n".join(pain_points)
        
        # Create opportunities
        opportunities = []
        app_likelihood = get_value("How likely are you to use an app that tracks political lobbying and donations? (Scale: 1 = Not likely at all, 10 = Extremely likely)")
        if isinstance(app_likelihood, (int, float)) and app_likelihood >= 7:
            opportunities.append("High interest in using political transparency app")
        
        changed_opinion = get_value("Have you ever changed your opinion about a politician based on their financial ties to lobbyists?")
        if changed_opinion == "Yes":
            opportunities.append("Demonstrated willingness to change opinions based on financial disclosure information")
        
        features = get_value("Which features would you find most useful in an app about political transparency? (Select up to 3)")
        if features != "N/A" and pd.notna(features):
            opportunities.append(f"Wants app features: {features}")
        
        knows_reps = get_value("Do you know who your representatives are? (state, county) ")
        if knows_reps == "Yes":
            opportunities.append("Already knows their representatives - engaged citizen")
        elif knows_reps == "No":
            opportunities.append("Opportunity to educate about representatives")
        
        opportunities_text = "\n".join(opportunities)
        
        # Format date
        try:
            if 'Horodateur' in row and pd.notna(row['Horodateur']):
                timestamp = row['Horodateur']
                if isinstance(timestamp, str):
                    date_str = datetime.strptime(timestamp, '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%m/%d/%Y')
                else:
                    date_str = timestamp.strftime('%m/%d/%Y')
            else:
                date_str = "N/A"
        except:
            date_str = "N/A"
        
        # Add record to empathy data
        empathy_data.append({
            "#": idx + 1,
            "Interviewer Name (Team Member)": "SimpleGov Survey",
            "Interviewee Name": f"Respondent {idx + 1}",
            "Date": date_str,
            "User Persona": "Citizen",
            "Gender (as needed)": get_value("What is your gender?"),
            "Other demographic breakdown": demographic,
            "Interview Notes": interview_notes,
            "Direct Quotes": direct_quotes,
            "Opportunity": opportunities_text,
            "Pain Points": pain_points_text
        })
    
    # Convert to DataFrame
    empathy_df = pd.DataFrame(empathy_data)
    
    # Save to file if output_file is provided
    if output_file:
        if output_file.endswith('.xlsx'):
            empathy_df.to_excel(output_file, index=False)
        elif output_file.endswith('.csv'):
            empathy_df.to_csv(output_file, index=False)
        print(f"Saved formatted data to {output_file}")
    
    return empathy_df

# Example usage
if __name__ == "__main__":
    # Replace with your actual file paths
    survey_file = "SurveyResponse.xlsx"  # or "SurveyResponse.csv"
    output_file = "Empathy_Interview_Data.xlsx"  # or "Empathy_Interview_Data.csv"
    
    # Check if files exist
    if not os.path.exists(survey_file):
        print(f"Error: The survey file {survey_file} does not exist.")
    else:
        # Process the conversion
        try:
            result = convert_survey_to_empathy_format(survey_file, output_file)
            print(f"Successfully converted {len(result)} survey responses to empathy interview format.")
        except Exception as e:
            print(f"Error during conversion: {str(e)}")